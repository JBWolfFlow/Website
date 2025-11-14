import { Helmet } from 'react-helmet-async';
import { Users, Linkedin, Twitter, Github, Dribbble, Mail } from 'lucide-react';
import { teamMembers } from '../../data/team';

/**
 * Team Page Component
 * Displays team member profiles with photos, bios, and contact information
 */
const Team = () => {
  return (
    <>
      <Helmet>
        <title>Our Team | NeuroForge Technologies</title>
        <meta name="description" content="Meet the talented team behind NeuroForge Technologies. Expert engineers, AI specialists, and designers building the future of technology." />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-600 to-accent-500 rounded-full flex items-center justify-center">
                <Users className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Meet Our Team
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The brilliant minds behind NeuroForge Technologies. A diverse team of engineers, AI specialists, and designers united by a passion for innovation and excellence.
            </p>
          </div>

          {/* Team Members Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {teamMembers.map((member, index) => (
              <div
                key={member.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                {/* Member Image */}
                <div className="relative h-80 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                  {/* Actual image */}
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top"
                    onLoad={(e) => {
                      // Hide placeholder when image loads
                      const placeholder = e.target.parentElement.querySelector('.placeholder-circle');
                      if (placeholder) placeholder.style.display = 'none';
                    }}
                    onError={(e) => {
                      // Show placeholder if image fails to load
                      e.target.style.display = 'none';
                      const placeholder = e.target.parentElement.querySelector('.placeholder-circle');
                      if (placeholder) placeholder.style.display = 'flex';
                    }}
                  />
                  {/* Placeholder circle - only shows if image fails to load */}
                  <div className="placeholder-circle absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-primary-600 to-accent-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-5xl">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Member Info */}
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {member.name}
                  </h2>
                  <p className="text-primary-600 font-semibold mb-4">
                    {member.role}
                  </p>

                  {/* Bio */}
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {member.bio}
                  </p>

                  {/* Specialties */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Specialties</h3>
                    <div className="flex flex-wrap gap-2">
                      {member.specialties.map((specialty, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-primary-50 text-primary-700 text-sm rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Education */}
                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">Education</h3>
                    <p className="text-gray-600 text-sm">{member.education}</p>
                  </div>

                  {/* Social Links */}
                  <div className="flex items-center gap-3">
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all duration-300"
                        aria-label={`Email ${member.name}`}
                        title="Email"
                      >
                        <Mail className="w-5 h-5" />
                      </a>
                    )}
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all duration-300"
                        aria-label={`${member.name} on LinkedIn`}
                        title="LinkedIn"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                    )}
                    {member.twitter && (
                      <a
                        href={member.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all duration-300"
                        aria-label={`${member.name} on Twitter`}
                        title="Twitter"
                      >
                        <Twitter className="w-5 h-5" />
                      </a>
                    )}
                    {member.github && (
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all duration-300"
                        aria-label={`${member.name} on GitHub`}
                        title="GitHub"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                    {member.dribbble && (
                      <a
                        href={member.dribbble}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all duration-300"
                        aria-label={`${member.name} on Dribbble`}
                        title="Dribbble"
                      >
                        <Dribbble className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Join Our Team CTA */}
          <div className="bg-gradient-to-r from-primary-600 to-accent-500 rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Want to Join Our Team?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              We're always looking for talented individuals who share our passion for innovation and excellence.
            </p>
            <a
              href="/careers"
              className="inline-block bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              View Open Positions
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Team;