"use client";

interface FeaturesSectionProps {
  data: {
    title?: string;
    items?: string[];
  };
}

export default function FeaturesSection({ data }: FeaturesSectionProps) {
  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">

        {data?.title && (
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
            {data.title}
          </h2>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data?.items?.map((item, index) => (
            <div
              key={index}
              className="p-6 border rounded-lg bg-gray-50 text-center"
            >
              <p className="text-gray-700 font-medium">{item}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}