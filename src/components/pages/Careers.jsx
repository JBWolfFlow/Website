import { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Briefcase, Upload, X, Loader2, Shield, CheckCircle } from 'lucide-react';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';
import { sanitizeInput, validateEmail } from '../../utils/security';

/**
 * Careers Page Component
 * Professional careers page with application form and resume upload
 */
const Careers = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    expertise: '',
    experience: '',
    message: ''
  });
  const [resume, setResume] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const fileInputRef = useRef(null);

  const expertiseOptions = [
    'Full-Stack Development',
    'Frontend Development',
    'Backend Development',
    'Mobile Development',
    'AI & Machine Learning',
    'DevOps & Cloud',
    'UI/UX Design',
    'Data Science',
    'Cybersecurity',
    'Project Management',
    'Other'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = sanitizeInput(value);
    
    setFormData((prev) => ({
      ...prev,
      [name]: sanitizedValue
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      // Validate file type
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
      
      if (!allowedTypes.includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          resume: 'Please upload a PDF or Word document'
        }));
        return;
      }
      
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          resume: 'File size must be less than 5MB'
        }));
        return;
      }
      
      setResume(file);
      setErrors((prev) => ({
        ...prev,
        resume: ''
      }));
    }
  };

  const removeResume = () => {
    setResume(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!formData.expertise) {
      newErrors.expertise = 'Please select your area of expertise';
    }
    
    if (!formData.experience.trim()) {
      newErrors.experience = 'Please describe your experience';
    } else if (formData.experience.trim().length < 50) {
      newErrors.experience = 'Please provide at least 50 characters';
    }
    
    if (!resume) {
      newErrors.resume = 'Please upload your resume';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    setErrors({});
    
    try {
      // Use FormData for file upload (Web3Forms requirement)
      const formDataToSend = new FormData();
      
      // Add Web3Forms access key
      formDataToSend.append('access_key', import.meta.env.VITE_WEB3FORMS_ACCESS_KEY);
      
      // Add subject and metadata
      formDataToSend.append('subject', `New Career Application - ${formData.name}`);
      formDataToSend.append('from_name', 'NeuroForge Technologies Careers');
      
      // Add form fields with clear labels
      formDataToSend.append('Name', formData.name);
      formDataToSend.append('Email', formData.email);
      formDataToSend.append('Phone', formData.phone);
      formDataToSend.append('Area of Expertise', formData.expertise);
      formDataToSend.append('Professional Experience', formData.experience);
      
      if (formData.message) {
        formDataToSend.append('Additional Information', formData.message);
      }
      
      // Add resume file as attachment
      formDataToSend.append('attachment', resume, resume.name);
      
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataToSend
      });
      
      const result = await response.json();
      
      setIsSubmitting(false);
      
      if (result.success) {
        setSubmitSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          expertise: '',
          experience: '',
          message: ''
        });
        setResume(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      } else {
        console.error('Web3Forms error:', result);
        setErrors({
          message: result.message || 'Failed to submit application. Please try again.'
        });
      }
    } catch (error) {
      setIsSubmitting(false);
      setErrors({
        message: 'An unexpected error occurred. Please try again later.'
      });
      console.error('Form submission error:', error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Careers | NeuroForge Technologies</title>
        <meta name="description" content="Join the NeuroForge Technologies team. Explore career opportunities and submit your application." />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-600 to-accent-500 rounded-full flex items-center justify-center">
                <Briefcase className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Join Our Team
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              We're always looking for talented individuals who share our passion for innovation and excellence.
            </p>
            
            {/* No Open Positions Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                No Open Positions at This Time
              </h2>
              <p className="text-gray-700 mb-4">
                While we don't have any specific openings right now, we're always interested in connecting with exceptional talent. Submit your application below, and we'll keep your information on file for future opportunities.
              </p>
            </div>
          </div>

          {/* Application Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Submit Your Application
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {/* Security Badge */}
              <div className="flex items-center gap-2 text-sm text-gray-600 bg-green-50 border border-green-200 rounded-lg p-3">
                <Shield className="text-green-600" size={18} />
                <span>Your information is secure and confidential</span>
              </div>

              {/* Name */}
              <Input
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                required
                placeholder="John Doe"
                disabled={isSubmitting}
              />

              {/* Email */}
              <Input
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                required
                placeholder="john@example.com"
                disabled={isSubmitting}
              />

              {/* Phone */}
              <Input
                label="Phone Number"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
                required
                placeholder="(206) 876-0437"
                disabled={isSubmitting}
              />

              {/* Expertise */}
              <div className="w-full">
                <label
                  htmlFor="expertise"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Area of Expertise
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <select
                  id="expertise"
                  name="expertise"
                  value={formData.expertise}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed ${
                    errors.expertise ? 'border-red-500' : ''
                  }`}
                >
                  <option value="">Select your expertise</option>
                  {expertiseOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {errors.expertise && (
                  <p className="mt-2 text-sm text-red-600">{errors.expertise}</p>
                )}
              </div>

              {/* Experience */}
              <Textarea
                label="Professional Experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                error={errors.experience}
                required
                rows={6}
                maxLength={2000}
                showCharCount
                placeholder="Tell us about your professional background, key achievements, and relevant skills..."
                disabled={isSubmitting}
              />

              {/* Additional Message */}
              <Textarea
                label="Additional Information (Optional)"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                maxLength={1000}
                showCharCount
                placeholder="Any additional information you'd like to share..."
                disabled={isSubmitting}
              />

              {/* Resume Upload */}
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resume / CV
                  <span className="text-red-500 ml-1">*</span>
                </label>
                
                {!resume ? (
                  <div className="relative">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      disabled={isSubmitting}
                      className="hidden"
                      id="resume-upload"
                    />
                    <label
                      htmlFor="resume-upload"
                      className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-200 ${
                        errors.resume
                          ? 'border-red-500 bg-red-50'
                          : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
                      } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        PDF or Word document (Max 5MB)
                      </p>
                    </label>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {resume.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {(resume.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={removeResume}
                      disabled={isSubmitting}
                      className="p-1 hover:bg-red-100 rounded transition-colors duration-200"
                    >
                      <X className="w-5 h-5 text-red-600" />
                    </button>
                  </div>
                )}
                
                {errors.resume && (
                  <p className="mt-2 text-sm text-red-600">{errors.resume}</p>
                )}
              </div>

              {/* Error Message */}
              {errors.message && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                  <p className="font-medium">Submission Error</p>
                  <p className="text-sm mt-1">{errors.message}</p>
                </div>
              )}

              {/* Success Message */}
              {submitSuccess && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                  <p className="font-medium">Application Submitted Successfully!</p>
                  <p className="text-sm mt-1">
                    Thank you for your interest. We'll review your application and get back to you soon.
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={20} />
                    Submitting Application...
                  </>
                ) : (
                  'Submit Application'
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Careers;