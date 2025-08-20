import React from 'react';

interface BrandSpecificStepProps {
  brand: any;
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

const BrandSpecificStep: React.FC<BrandSpecificStepProps> = ({ 
  brand, 
  formData, 
  updateFormData, 
  onNext, 
  onBack 
}) => {
  const getBrandQuestions = () => {
    switch (brand.targetDemographic) {
      case 'Veterans':
        return {
          title: 'Military Service',
          questions: [
            {
              key: 'militaryStatus',
              label: 'What is your military status?',
              type: 'select',
              options: ['Veteran', 'Active Duty', 'Reserves', 'National Guard', 'Retired', 'None']
            },
            {
              key: 'branchOfService',
              label: 'Branch of Service',
              type: 'select',
              options: ['Army', 'Navy', 'Air Force', 'Marines', 'Coast Guard', 'Space Force']
            }
          ]
        };
      
      case 'Entrepreneurs':
        return {
          title: 'Business Information',
          questions: [
            {
              key: 'businessType',
              label: 'What type of business do you own?',
              type: 'select',
              options: ['Startup', 'Small Business', 'Medium Business', 'Large Business', 'Consulting', 'Other']
            },
            {
              key: 'businessRevenue',
              label: 'Annual business revenue',
              type: 'select',
              options: ['Under $100k', '$100k-$500k', '$500k-$1M', '$1M-$5M', '$5M+']
            }
          ]
        };
      
      case 'New families':
        return {
          title: 'Family Information',
          questions: [
            {
              key: 'childrenCount',
              label: 'How many children do you have?',
              type: 'select',
              options: ['0', '1', '2', '3', '4+']
            },
            {
              key: 'childrenAges',
              label: 'Ages of your children',
              type: 'text',
              placeholder: 'e.g., 2, 5, 8'
            }
          ]
        };
      
      case 'Blue-collar workers':
        return {
          title: 'Work Information',
          questions: [
            {
              key: 'tradeType',
              label: 'What type of work do you do?',
              type: 'select',
              options: ['Construction', 'Manufacturing', 'Transportation', 'Maintenance', 'Skilled Trade', 'Other']
            },
            {
              key: 'yearsExperience',
              label: 'Years of experience',
              type: 'select',
              options: ['1-5 years', '5-10 years', '10-20 years', '20+ years']
            }
          ]
        };
      
      case 'High-achievers':
        return {
          title: 'Professional Information',
          questions: [
            {
              key: 'incomeLevel',
              label: 'Annual income range',
              type: 'select',
              options: ['$100k-$200k', '$200k-$500k', '$500k-$1M', '$1M+']
            },
            {
              key: 'netWorth',
              label: 'Net worth range',
              type: 'select',
              options: ['$500k-$1M', '$1M-$5M', '$5M-$10M', '$10M+']
            }
          ]
        };
      
      case 'Immigrant families':
        return {
          title: 'Immigration Information',
          questions: [
            {
              key: 'citizenshipStatus',
              label: 'Citizenship status',
              type: 'select',
              options: ['US Citizen', 'Permanent Resident', 'Work Visa', 'Student Visa', 'Other']
            },
            {
              key: 'yearsInUS',
              label: 'Years in the United States',
              type: 'select',
              options: ['1-5 years', '5-10 years', '10-20 years', '20+ years']
            }
          ]
        };
      
      case 'First responders — firefighters':
        return {
          title: 'First Responder Information',
          questions: [
            {
              key: 'responderType',
              label: 'Type of first responder',
              type: 'select',
              options: ['Firefighter', 'Police Officer', 'EMT', 'Paramedic', 'Other']
            },
            {
              key: 'yearsService',
              label: 'Years of service',
              type: 'select',
              options: ['1-5 years', '5-10 years', '10-20 years', '20+ years']
            }
          ]
        };
      
      case 'Teachers':
        return {
          title: 'Education Information',
          questions: [
            {
              key: 'teachingLevel',
              label: 'What do you teach?',
              type: 'select',
              options: ['Elementary', 'Middle School', 'High School', 'College', 'Special Education', 'Other']
            },
            {
              key: 'yearsTeaching',
              label: 'Years of teaching experience',
              type: 'select',
              options: ['1-5 years', '5-10 years', '10-20 years', '20+ years']
            }
          ]
        };
      
      case 'Day traders':
        return {
          title: 'Trading Information',
          questions: [
            {
              key: 'tradingExperience',
              label: 'Years of trading experience',
              type: 'select',
              options: ['1-2 years', '2-5 years', '5-10 years', '10+ years']
            },
            {
              key: 'tradingFrequency',
              label: 'How often do you trade?',
              type: 'select',
              options: ['Daily', 'Weekly', 'Monthly', 'Occasionally']
            }
          ]
        };
      
      case 'Content creators':
        return {
          title: 'Content Creation Information',
          questions: [
            {
              key: 'contentType',
              label: 'What type of content do you create?',
              type: 'select',
              options: ['YouTube', 'TikTok', 'Instagram', 'Blog', 'Podcast', 'Other']
            },
            {
              key: 'audienceSize',
              label: 'Approximate audience size',
              type: 'select',
              options: ['1k-10k', '10k-100k', '100k-1M', '1M+']
            }
          ]
        };
      
      default:
        return {
          title: 'Basic Information',
          questions: [
            {
              key: 'occupation',
              label: 'What is your occupation?',
              type: 'text',
              placeholder: 'Enter your job title'
            }
          ]
        };
    }
  };

  const questions = getBrandQuestions();

  const handleNext = () => {
    // Validate that required fields are filled
    const requiredFields = questions.questions.map(q => q.key);
    const hasRequiredFields = requiredFields.every(field => formData[field]);
    
    if (hasRequiredFields) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">{questions.title}</h2>
        <p className="text-gray-600 mt-2">Help us understand your specific needs</p>
      </div>

      <div className="space-y-4">
        {questions.questions.map((question, index) => (
          <div key={index} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {question.label}
            </label>
            
            {question.type === 'select' ? (
              <select
                value={formData[question.key] || ''}
                onChange={(e) => updateFormData({ [question.key]: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select an option</option>
                {question.options?.map((option: string) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                value={formData[question.key] || ''}
                onChange={(e) => updateFormData({ [question.key]: e.target.value })}
                placeholder={question.placeholder}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex space-x-3 pt-4">
        <button
          onClick={onBack}
          className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          style={{ backgroundColor: brand.primaryColor }}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default BrandSpecificStep; 