'use client';

import { Card, CardContent } from '@/components/ui/card';

interface IULEducationSectionProps {
  brand: {
    id: string;
    name: string;
    displayName: string;
  };
}

export default function IULEducationSection({ brand }: IULEducationSectionProps) {
  const getBrandSpecificContent = () => {
    switch (brand.id) {
      case 'veteran-legacy-life':
        return {
          title: "What is Indexed Universal Life (IUL)?",
          subtitle: "Your Service Deserves More Than Basic Coverage",
          mainHeading: "Think of IUL as Your Military Benefits Upgrade",
          benefits: [
            {
              title: "VA Benefits + Market Growth",
              description: "While the VA offers basic life insurance, IUL grows with the market but never loses money."
            },
            {
              title: "Living Benefits",
              description: "Access your cash value while alive for emergencies, education, or retirement."
            },
            {
              title: "Tax-Free Growth",
              description: "Your cash value grows tax-free, unlike traditional investments."
            }
          ],
          example: {
            name: "SGT Johnson",
            timeline: [
              { age: "Age 30: Started IUL Policy", value: "$100,000 coverage" },
              { age: "Age 40: Cash Value", value: "$25,000", color: "text-green-600" },
              { age: "Age 50: Cash Value", value: "$75,000", color: "text-green-600" },
              { age: "Age 60: Cash Value", value: "$150,000", color: "text-green-600" }
            ]
          },
          questions: [
            {
              question: '"I already have VA life insurance. Why do I need this?"',
              answer: "VA insurance is basic coverage. IUL provides living benefits, tax-free growth, and can supplement your VA benefits."
            },
            {
              question: '"What if I can\'t afford high premiums?"',
              answer: "IUL offers flexible premiums. Start with what you can afford and increase as your income grows."
            },
            {
              question: '"Is this like the stock market? Can I lose money?"',
              answer: "No! IUL has a floor of 0% - you never lose money, even when markets crash."
            },
            {
              question: '"Can I use this for my kids\' college?"',
              answer: "Yes! You can borrow against your cash value tax-free for education, emergencies, or retirement."
            }
          ]
        };

      case 'responder-legacy-life':
        return {
          title: "What is Indexed Universal Life (IUL)?",
          subtitle: "Your Service Deserves More Than Basic Coverage",
          mainHeading: "Think of IUL as Your First Responder Safety Net",
          benefits: [
            {
              title: "Line-of-Duty Protection",
              description: "Enhanced coverage for high-risk professions with living benefits for critical illness."
            },
            {
              title: "Emergency Access",
              description: "Access your cash value immediately for medical expenses or lost income."
            },
            {
              title: "Tax-Free Growth",
              description: "Your cash value grows tax-free, providing a secure financial foundation."
            }
          ],
          example: {
            name: "Officer Martinez",
            timeline: [
              { age: "Year 1: Started IUL", value: "$500,000 coverage" },
              { age: "Year 3: Cash Value", value: "$35,000", color: "text-green-600" },
              { age: "Year 5: Medical Emergency", value: "$50,000 access", color: "text-blue-600" },
              { age: "Year 7: Cash Value", value: "$120,000", color: "text-green-600" }
            ]
          },
          questions: [
            {
              question: '"I have department benefits. Why do I need this?"',
              answer: "Department benefits are basic coverage. IUL provides living benefits and grows your wealth over time."
            },
            {
              question: '"What if I get injured on duty?"',
              answer: "IUL provides living benefits for critical illness and can help replace lost income during recovery."
            },
            {
              question: '"Is this like the stock market? Can I lose money?"',
              answer: "No! IUL has a floor of 0% - you never lose money, even when markets crash."
            },
            {
              question: '"Can I use this for medical expenses?"',
              answer: "Yes! You can access your cash value tax-free for medical expenses or emergencies."
            }
          ]
        };

      case 'educator-legacy-life':
        return {
          title: "What is Indexed Universal Life (IUL)?",
          subtitle: "Your Service Deserves More Than Basic Coverage",
          mainHeading: "Think of IUL as Your Educator's Financial Foundation",
          benefits: [
            {
              title: "School Safety Protection",
              description: "Enhanced coverage for educators with living benefits for critical illness."
            },
            {
              title: "Education Funding",
              description: "Access your cash value for your own education or your children's college costs."
            },
            {
              title: "Tax-Free Growth",
              description: "Your cash value grows tax-free, providing a secure financial future."
            }
          ],
          example: {
            name: "Ms. Rodriguez",
            timeline: [
              { age: "Year 1: Started IUL", value: "$300,000 coverage" },
              { age: "Year 3: Cash Value", value: "$25,000", color: "text-green-600" },
              { age: "Year 5: Daughter's College", value: "$40,000 loan", color: "text-blue-600" },
              { age: "Year 7: Cash Value", value: "$85,000", color: "text-green-600" }
            ]
          },
          questions: [
            {
              question: '"I have teacher benefits. Why do I need this?"',
              answer: "Teacher benefits are basic coverage. IUL provides living benefits and grows your wealth over time."
            },
            {
              question: '"What if I can\'t afford high premiums?"',
              answer: "IUL offers flexible premiums. Start with what you can afford and increase as your salary grows."
            },
            {
              question: '"Is this like the stock market? Can I lose money?"',
              answer: "No! IUL has a floor of 0% - you never lose money, even when markets crash."
            },
            {
              question: '"Can I use this for my kids\' college?"',
              answer: "Yes! You can borrow against your cash value tax-free for education expenses."
            }
          ]
        };

      default:
        return {
          title: "What is Indexed Universal Life (IUL)?",
          subtitle: "Your Future Deserves More Than Basic Coverage",
          mainHeading: "Think of IUL as Your Smart Financial Foundation",
          benefits: [
            {
              title: "Market Growth + Safety",
              description: "IUL grows with the market but never loses money, providing the best of both worlds."
            },
            {
              title: "Living Benefits",
              description: "Access your cash value while alive for emergencies, education, or retirement."
            },
            {
              title: "Tax-Free Growth",
              description: "Your cash value grows tax-free, unlike traditional investments."
            }
          ],
          example: {
            name: "Professional",
            timeline: [
              { age: "Year 1: Started IUL", value: "$500,000 coverage" },
              { age: "Year 3: Cash Value", value: "$35,000", color: "text-green-600" },
              { age: "Year 5: Emergency Fund", value: "$60,000 access", color: "text-blue-600" },
              { age: "Year 7: Cash Value", value: "$140,000", color: "text-green-600" }
            ]
          },
          questions: [
            {
              question: '"I have employer benefits. Why do I need this?"',
              answer: "Employer benefits are basic coverage. IUL provides living benefits and grows your wealth over time."
            },
            {
              question: '"What if I can\'t afford high premiums?"',
              answer: "IUL offers flexible premiums. Start with what you can afford and increase as your income grows."
            },
            {
              question: '"Is this like the stock market? Can I lose money?"',
              answer: "No! IUL has a floor of 0% - you never lose money, even when markets crash."
            },
            {
              question: '"Can I use this for emergencies?"',
              answer: "Yes! You can access your cash value tax-free for emergencies or unexpected expenses."
            }
          ]
        };
    }
  };

  const content = getBrandSpecificContent();

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{content.title}</h2>
          <p className="text-xl text-gray-600">{content.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Benefits */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{content.mainHeading}</h3>
              <div className="space-y-6">
                {content.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">{benefit.title}</h4>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Example Timeline */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-4">Real Example: {content.example.name}</h4>
              <div className="space-y-3">
                {content.example.timeline.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">{item.age}</span>
                    <span className={`font-semibold ${item.color || 'text-gray-900'}`}>{item.value}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-4">
                *Example assumes consistent premium payments and market performance. Actual results may vary.
              </p>
            </div>
          </div>

          {/* Right Column - Q&A */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Common Questions</h3>
            {content.questions.map((qa, index) => (
              <Card key={index} className="p-6">
                <CardContent className="space-y-3">
                  <h4 className="font-semibold text-gray-900 text-lg">{qa.question}</h4>
                  <p className="text-gray-600">{qa.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 