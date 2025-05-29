import React from 'react';

const Abouts = () => {
    const teamMembers = [
        {
          name: 'Chan EkMongkol',
          roles: ['UX/UI Design', 'Frontend–Backend Integrator', 'Research and Basic Setup'],
        },
        {
          name: 'Chabnab Devin',
          roles: ['Documents and Prototyping', 'Testing and Validating Documents'],
        },
        {
          name: 'Khorn Mengkhey',
          roles: ['Frontend Developer','Implementation and Deployment'],
        },
        {
          name: 'Ky Rasy',
          roles: ['Backend Developer','Coding Core Algorithm'],
        },
      ];
  return (
    <div>
      <div className="p-6 mx-auto bg-[#F1F0E8] shadow rounded-lg space-y-4">

        <h1 className='text-3xl font-bold text-center'>Our Team</h1>
        <div className="space-y-6">
      {teamMembers.map((member, index) => (
        <div key={index}>
          <p className="text-2xl font-semibold">{member.name}</p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            {member.roles.map((role, i) => (
              <li key={i}>{role}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
        <h1 className="text-3xl font-bold text-center">Contributions</h1>
        <p>
        In this Hill Cipher project, our team collaborated to design and develop a complete web-based cryptography tool.
        The key contributions include:
      </p>

      <ul className="list-disc list-inside space-y-2">
        <li>Designing a clean and responsive user interface using React and Tailwind CSS</li>
        <li>Implementing the Hill Cipher encryption and decryption logic on the backend using Python and Django</li>
        <li>Creating RESTful API endpoints to handle cipher operations</li>
        <li>Connecting the frontend with backend services through API integration</li>
        <li>Developing interactive components for user input, key matrix handling, and result display</li>
        <li>Ensuring input validation, error handling, and user-friendly interactions</li>
        <li>Writing clear documentation and an educational tutorial to explain how the Hill Cipher works</li>
        <li>Conducting testing to ensure accuracy and stability across different scenarios</li>
      </ul>

      <p>
        This project was a collaborative effort that combined design, development, integration, and learning to deliver
        an interactive and educational cryptographic tool.
      </p>

      <i className='text-center align-middle items-center'>&copy; Al right resevered 2025.</i>

      </div>
    </div>
  );
};

export default Abouts;
