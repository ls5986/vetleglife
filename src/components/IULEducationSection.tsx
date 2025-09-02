'use client';

import { Card, CardContent } from '@/components/ui/card';

interface IULEducationSectionProps {
  brand: {
    id: string;
    primaryColor: string;
    brandName: string;
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

      case 'startup-legacy-life':
        return {
          title: "What is Indexed Universal Life (IUL)?",
          subtitle: "Your Startup's Success Shouldn't Risk Your Family's Future",
          mainHeading: "Think of IUL as Your Smart Founder's Safety Net",
          benefits: [
            {
              title: "Emergency Runway for Your Family",
              description: "If something happens to you, your family has immediate access to cash value."
            },
            {
              title: "Business Opportunity Fund",
              description: "Borrow against your cash value for business expansion or new ventures."
            },
            {
              title: "Tax-Free Growth",
              description: "Your wealth grows tax-free, unlike your business profits or stock options."
            }
          ],
          example: {
            name: "Sarah Chen, Tech Founder",
            timeline: [
              { age: "Year 1: Started IUL", value: "$500,000 coverage" },
              { age: "Year 3: Cash Value", value: "$45,000", color: "text-green-600" },
              { age: "Year 5: Used for Series A", value: "$75,000 loan", color: "text-blue-600" },
              { age: "Year 7: Cash Value", value: "$180,000", color: "text-green-600" }
            ]
          },
          questions: [
            {
              question: '"I\'m reinvesting everything in my company. How can I afford this?"',
              answer: "Start with what you can afford. IUL premiums are flexible and can increase as your business grows."
            },
            {
              question: '"What if my startup fails? Will I lose my insurance?"',
              answer: "No! Your IUL policy is separate from your business. It's your personal safety net that stays with you."
            },
            {
              question: '"Can I use this for business funding?"',
              answer: "Yes! You can borrow against your cash value tax-free for business opportunities or emergencies."
            },
            {
              question: '"How is this different from term life insurance?"',
              answer: "Term insurance only protects. IUL protects AND builds wealth you can use while alive."
            }
          ]
        };

      case 'foundation-legacy-life':
        return {
          title: "What is Indexed Universal Life (IUL)?",
          subtitle: "Start Building Generational Wealth Today",
          mainHeading: "Think of IUL as Your Family's Money Tree",
          benefits: [
            {
              title: "Plant the Seed Early",
              description: "Start with what you can afford - even $50/month can grow into $500,000+ for your family."
            },
            {
              title: "Watch It Grow Tax-Free",
              description: "Your money grows with the market but never loses value, and it's all tax-free."
            },
            {
              title: "Harvest for Your Family",
              description: "Use the cash value for college, emergencies, or pass it on to future generations."
            }
          ],
          example: {
            name: "The Rodriguez Family",
            timeline: [
              { age: "Age 28: Started IUL", value: "$250,000 coverage" },
              { age: "Age 35: Cash Value", value: "$35,000", color: "text-green-600" },
              { age: "Age 42: Used for College", value: "$50,000 loan", color: "text-blue-600" },
              { age: "Age 50: Cash Value", value: "$120,000", color: "text-green-600" }
            ]
          },
          questions: [
            {
              question: '"We\'re just starting out. How can we afford this?"',
              answer: "Start small! Even $25-50/month can grow significantly over time. Premiums can increase as your income grows."
            },
            {
              question: '"What if we need money for emergencies?"',
              answer: "You can access your cash value tax-free for emergencies, medical expenses, or unexpected costs."
            },
            {
              question: '"How is this different from a 529 college plan?"',
              answer: "IUL is more flexible - you can use it for anything, not just education, and it provides life insurance protection."
            },
            {
              question: '"What if we can\'t keep paying premiums?"',
              answer: "IUL offers flexible premiums. You can reduce or skip payments using your cash value to keep the policy active."
            }
          ]
        };

      case 'trade-legacy-life':
        return {
          title: "What is Indexed Universal Life (IUL)?",
          subtitle: "Your Hard Work Deserves to Work Harder for You",
          mainHeading: "Think of IUL as Building a Financial Foundation",
          benefits: [
            {
              title: "Your Tools - They Appreciate in Value",
              description: "Like your tools that get more valuable with time, your IUL policy grows stronger every year."
            },
            {
              title: "Your Skills - They Compound Over Time",
              description: "Just like your expertise grows, your cash value compounds and builds wealth."
            },
            {
              title: "Your Reputation - It Grows with Every Job",
              description: "Your policy grows with the market but never loses money, just like your business reputation."
            }
          ],
          example: {
            name: "Mike Rodriguez, HVAC Contractor",
            timeline: [
              { age: "Year 1: Started IUL", value: "$300,000 coverage" },
              { age: "Year 3: Cash Value", value: "$35,000", color: "text-green-600" },
              { age: "Year 5: Used for Equipment", value: "$50,000 loan", color: "text-blue-600" },
              { age: "Year 7: Cash Value", value: "$95,000", color: "text-green-600" }
            ]
          },
          questions: [
            {
              question: '"I work with my hands. I don\'t understand complex financial products."',
              answer: "IUL is simple - it's like a savings account that grows with the market but never loses money."
            },
            {
              question: '"Can I use this for equipment upgrades?"',
              answer: "Yes! You can borrow against your cash value for new tools, equipment, or business expansion."
            },
            {
              question: '"What if I get injured and can\'t work?"',
              answer: "IUL provides living benefits for critical illness and can help replace lost income."
            },
            {
              question: '"How is this different from my union benefits?"',
              answer: "This is personal wealth building that stays with you regardless of union status or job changes."
            }
          ]
        };

      case 'success-legacy-life':
        return {
          title: "What is Indexed Universal Life (IUL)?",
          subtitle: "Your Success Should Multiply, Not Just Protect",
          mainHeading: "Think of IUL as Your Wealth Accelerator",
          benefits: [
            {
              title: "Tax-Free Growth",
              description: "Unlike your 401k or stock options, IUL grows tax-free and provides living benefits."
            },
            {
              title: "Living Benefits",
              description: "Access cash while alive for emergencies, business opportunities, or retirement."
            },
            {
              title: "Estate Planning",
              description: "Pass wealth tax-efficiently to your family and create a lasting legacy."
            }
          ],
          example: {
            name: "Jennifer Park, Sales Executive",
            timeline: [
              { age: "Year 1: Started IUL", value: "$1,000,000 coverage" },
              { age: "Year 3: Cash Value", value: "$85,000", color: "text-green-600" },
              { age: "Year 5: Used for Investment", value: "$150,000 loan", color: "text-blue-600" },
              { age: "Year 7: Cash Value", value: "$320,000", color: "text-green-600" }
            ]
          },
          questions: [
            {
              question: '"I\'m already successful. Why do I need more insurance?"',
              answer: "IUL isn't just insurance - it's wealth building that protects AND multiplies your success."
            },
            {
              question: '"How is this different from my 401k?"',
              answer: "IUL provides tax-free growth, living benefits, and isn't tied to your employer."
            },
            {
              question: '"Can I use this for business opportunities?"',
              answer: "Yes! You can borrow against your cash value tax-free for investments or business ventures."
            },
            {
              question: '"What about estate taxes?"',
              answer: "IUL provides tax-efficient wealth transfer and can help fund estate taxes."
            }
          ]
        };

      case 'immigrant-legacy-life':
        return {
          title: "What is Indexed Universal Life (IUL)?",
          subtitle: "Secure the American Dream for Your Family",
          mainHeading: "Think of IUL as Your American Savings Account",
          benefits: [
            {
              title: "Grows Your Wealth Tax-Free",
              description: "Build wealth without worrying about complex tax implications."
            },
            {
              title: "Provides for Your Children's Education",
              description: "Fund your children's American education dreams with tax-free growth."
            },
            {
              title: "Sends Money Back Home",
              description: "Access cash value to help family back home when needed."
            }
          ],
          example: {
            name: "The Patel Family",
            timeline: [
              { age: "Year 1: Started IUL", value: "$400,000 coverage" },
              { age: "Year 3: Cash Value", value: "$45,000", color: "text-green-600" },
              { age: "Year 5: Used for College", value: "$60,000 loan", color: "text-blue-600" },
              { age: "Year 7: Cash Value", value: "$140,000", color: "text-green-600" }
            ]
          },
          questions: [
            {
              question: '"We came here for a better life. How do we protect it?"',
              answer: "IUL secures your American dream by protecting your family and building generational wealth."
            },
            {
              question: '"What if we need to send money back home?"',
              answer: "You can access your cash value tax-free to help family in your home country."
            },
            {
              question: '"How is this different from a regular savings account?"',
              answer: "IUL grows tax-free, provides life insurance protection, and builds wealth faster than savings."
            },
            {
              question: '"What if we don\'t understand American financial products?"',
              answer: "IUL is simple - it's like a savings account that grows with the market but never loses money."
            }
          ]
        };

      case 'responder-legacy-life':
        return {
          title: "What is Indexed Universal Life (IUL)?",
          subtitle: "Protection That Never Takes a Day Off",
          mainHeading: "Think of IUL as Your Backup Plan",
          benefits: [
            {
              title: "Higher Coverage for Dangerous Professions",
              description: "Get the protection you need for your high-risk, high-reward career."
            },
            {
              title: "Living Benefits for Critical Illness",
              description: "Access benefits for cancer, heart attack, or line-of-duty injuries."
            },
            {
              title: "Disability Riders Available",
              description: "Protect your income if you're injured and can't work."
            }
          ],
          example: {
            name: "Officer David Martinez",
            timeline: [
              { age: "Year 1: Started IUL", value: "$500,000 coverage" },
              { age: "Year 3: Cash Value", value: "$40,000", color: "text-green-600" },
              { age: "Year 5: Used for Medical", value: "$75,000 loan", color: "text-blue-600" },
              { age: "Year 7: Cash Value", value: "$160,000", color: "text-green-600" }
            ]
          },
          questions: [
            {
              question: '"We have dangerous jobs. Do we need special coverage?"',
              answer: "Yes! IUL provides higher coverage amounts and living benefits designed for first responders."
            },
            {
              question: '"What if I get injured on duty?"',
              answer: "IUL provides living benefits for critical illness and can help replace lost income."
            },
            {
              question: '"How is this different from my department benefits?"',
              answer: "This is personal protection that stays with you regardless of department or job changes."
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
          subtitle: "Your Pension + Our IUL = Complete Financial Security",
          mainHeading: "Think of IUL as Your Summer Vacation Fund",
          benefits: [
            {
              title: "Grows Tax-Free",
              description: "Unlike your 403b, IUL grows tax-free and provides living benefits."
            },
            {
              title: "Living Benefits for Medical Expenses",
              description: "Access cash value for medical emergencies or expenses."
            },
            {
              title: "Funds Summer Travel and Retirement Dreams",
              description: "Use your cash value for summer adventures or retirement planning."
            }
          ],
          example: {
            name: "Dr. Sarah Johnson, Professor",
            timeline: [
              { age: "Year 1: Started IUL", value: "$400,000 coverage" },
              { age: "Year 3: Cash Value", value: "$35,000", color: "text-green-600" },
              { age: "Year 5: Used for Summer", value: "$25,000 loan", color: "text-blue-600" },
              { age: "Year 7: Cash Value", value: "$95,000", color: "text-green-600" }
            ]
          },
          questions: [
            {
              question: '"We have pensions. Do we need more insurance?"',
              answer: "Your pension provides income. IUL builds wealth and provides living benefits for medical expenses."
            },
            {
              question: '"How is this different from my 403b?"',
              answer: "IUL provides tax-free growth, living benefits, and isn't tied to your employer."
            },
            {
              question: '"Can I use this for summer travel?"',
              answer: "Yes! You can borrow against your cash value for summer adventures or other expenses."
            },
            {
              question: '"What about retirement planning?"',
              answer: "IUL complements your pension by providing additional retirement income and wealth building."
            }
          ]
        };

      case 'trader-legacy-life':
        return {
          title: "What is Indexed Universal Life (IUL)?",
          subtitle: "Your Portfolio's Perfect Hedge",
          mainHeading: "Think of IUL as Your Risk Management Strategy",
          benefits: [
            {
              title: "Market Upside Without Downside Risk",
              description: "Grow with the market but never lose money, even during crashes."
            },
            {
              title: "Tax-Free Growth",
              description: "Better than your trading account - no capital gains taxes."
            },
            {
              title: "Living Benefits for Emergencies",
              description: "Access cash value for medical emergencies or market opportunities."
            }
          ],
          example: {
            name: "Alex Thompson, Day Trader",
            timeline: [
              { age: "Year 1: Started IUL", value: "$750,000 coverage" },
              { age: "Year 3: Cash Value", value: "$65,000", color: "text-green-600" },
              { age: "Year 5: Used for Opportunity", value: "$100,000 loan", color: "text-blue-600" },
              { age: "Year 7: Cash Value", value: "$220,000", color: "text-green-600" }
            ]
          },
          questions: [
            {
              question: '"I\'m already managing risk. Why do I need insurance?"',
              answer: "IUL is your portfolio's ultimate hedge - it grows with markets but never loses money."
            },
            {
              question: '"How is this different from my trading account?"',
              answer: "IUL provides tax-free growth and downside protection that your trading account doesn't offer."
            },
            {
              question: '"Can I use this for trading opportunities?"',
              answer: "Yes! You can borrow against your cash value for market opportunities or emergencies."
            },
            {
              question: '"What about estate planning?"',
              answer: "IUL provides tax-efficient wealth transfer and can help fund estate taxes."
            }
          ]
        };

      case 'creator-legacy-life':
        return {
          title: "What is Indexed Universal Life (IUL)?",
          subtitle: "Your Content Creates Wealth. Protect It.",
          mainHeading: "Think of IUL as Your Content Insurance",
          benefits: [
            {
              title: "Replaces Lost Income During Illness",
              description: "If you can't create content, your family still has financial security."
            },
            {
              title: "Funds Content Creation During Recovery",
              description: "Access cash value to fund equipment or production costs."
            },
            {
              title: "Provides Emergency Cash for Equipment",
              description: "Borrow against your cash value for new cameras, software, or gear."
            }
          ],
          example: {
            name: "Maya Rodriguez, YouTuber",
            timeline: [
              { age: "Year 1: Started IUL", value: "$600,000 coverage" },
              { age: "Year 3: Cash Value", value: "$55,000", color: "text-green-600" },
              { age: "Year 5: Used for Equipment", value: "$80,000 loan", color: "text-blue-600" },
              { age: "Year 7: Cash Value", value: "$180,000", color: "text-green-600" }
            ]
          },
          questions: [
            {
              question: '"My income is unpredictable. How do I plan for that?"',
              answer: "IUL offers flexible premiums that can adjust with your income fluctuations."
            },
            {
              question: '"What if I can\'t create content anymore?"',
              answer: "IUL provides living benefits that can replace lost income during illness or injury."
            },
            {
              question: '"Can I use this for new equipment?"',
              answer: "Yes! You can borrow against your cash value for cameras, software, or production gear."
            },
            {
              question: '"How is this different from a business account?"',
              answer: "IUL is personal wealth building that stays with you regardless of platform changes or algorithm updates."
            }
          ]
        };

      default:
        return {
          title: "What is Indexed Universal Life (IUL)?",
          subtitle: "Protect and Build Your Wealth",
          mainHeading: "Think of IUL as Your Financial Foundation",
          benefits: [
            {
              title: "Tax-Free Growth",
              description: "Your money grows tax-free, unlike traditional investments."
            },
            {
              title: "Living Benefits",
              description: "Access your cash value while alive for emergencies or opportunities."
            },
            {
              title: "Wealth Building",
              description: "Build generational wealth that can be passed on to your family."
            }
          ],
          example: {
            name: "Example Client",
            timeline: [
              { age: "Year 1: Started IUL", value: "$500,000 coverage" },
              { age: "Year 3: Cash Value", value: "$45,000", color: "text-green-600" },
              { age: "Year 5: Used for Opportunity", value: "$75,000 loan", color: "text-blue-600" },
              { age: "Year 7: Cash Value", value: "$160,000", color: "text-green-600" }
            ]
          },
          questions: [
            {
              question: '"How is this different from term life insurance?"',
              answer: "Term insurance only protects. IUL protects AND builds wealth you can use while alive."
            },
            {
              question: '"What if I can\'t afford high premiums?"',
              answer: "IUL offers flexible premiums. Start with what you can afford and increase as your income grows."
            },
            {
              question: '"Can I lose money?"',
              answer: "No! IUL has a floor of 0% - you never lose money, even when markets crash."
            },
            {
              question: '"How do I access my money?"',
              answer: "You can borrow against your cash value tax-free for emergencies, opportunities, or retirement."
            }
          ]
        };
    }
  };

  const content = getBrandSpecificContent();

  return (
    <section className="py-16" style={{ backgroundColor: `${brand.primaryColor}10` }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {content.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {content.subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {content.mainHeading}
            </h3>
            <div className="space-y-4">
              {content.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center mr-4 mt-1"
                    style={{ backgroundColor: brand.primaryColor }}
                  >
                    <span className="text-white font-bold text-sm">{index + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{benefit.title}</h4>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Real Example: {content.example.name}</h4>
            <div className="space-y-3 text-sm">
              {content.example.timeline.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span>{item.age}</span>
                  <span className={`font-semibold ${item.color || ''}`}>{item.value}</span>
                </div>
              ))}
              <div className="border-t pt-2 mt-4">
                <p className="text-gray-600 text-xs">*Example assumes consistent premium payments and market performance. Actual results may vary.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-6">
            Common Questions About IUL
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {content.questions.map((q, index) => (
              <div key={index}>
                <h4 className="font-semibold text-gray-900 mb-2">{q.question}</h4>
                <p className="text-gray-600 text-sm">{q.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 