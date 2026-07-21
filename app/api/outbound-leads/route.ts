import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Project A — outbound_leads
const supabaseA = createClient(
  process.env.PROJECT_A_SUPABASE_URL!,
  process.env.PROJECT_A_SERVICE_ROLE_KEY!
)

// Project B — sales_leads CRM
const supabaseB = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const {
      year,
      make,
      model,
      part,
      fullName,
      phone,
      email,
      zip,
    } = body

    if (!part || !fullName || !phone) {
      return NextResponse.json(
        {
          error: 'part, fullName and phone are required',
        },
        { status: 400 }
      )
    }

    // 1. Insert into Project A → outbound_leads
    const { error: errorA } = await supabaseA
      .from('outbound_leads')
      .insert({
        year: year || null,
        make: make || null,
        model: model || null,
        part,
        full_name: fullName,
        phone,
        email: email || null,
        zip: zip || null,
        terms_accepted: true,
      })

    if (errorA) {
      console.error('Project A insert failed:', errorA.message)
    }

    // 2. Insert into Project B → sales_leads
    const { error: errorB } = await supabaseB
      .from('sales_leads')
      .insert({
        customer_name: fullName,
        mobile_no: phone,
        email: email || null,
        year: year || null,
        make: make || null,
        model: model || null,
        part,
        source: 'AutoKing',

        // AutoKing website leads must enter the sales workflow as Open.
        status: 'Open',

        organization_id: '00000000-0000-0000-0000-000000000001',
      })

    if (errorB) {
      console.error('Project B insert failed:', errorB.message)

      return NextResponse.json(
        {
          error: errorB.message,
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
    })
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : 'Something went wrong'

    console.error('AutoKing lead submission failed:', err)

    return NextResponse.json(
      {
        error: message,
      },
      { status: 500 }
    )
  }
}