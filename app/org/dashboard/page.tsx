import { Shield, Users, Plus, Pen } from 'lucide-react';

// --- Mock Data ---
// In a real application, this data would be fetched from your database.
const organization = {
  name: 'Indy Warriors FC',
  logoUrl: '/icon-512x512.png', // Using an existing public asset as a placeholder
};

const teams = [
  { id: '1', name: 'U19 Boys ECNL', ageGroup: 'U19', rosterSize: 18 },
  { id: '2', name: 'U17 Girls Academy', ageGroup: 'U17', rosterSize: 22 },
  { id: '3', name: 'U15 Boys Pre-Academy', ageGroup: 'U15', rosterSize: 16 },
  { id: '4', name: 'U13 Girls Futures', ageGroup: 'U13', rosterSize: 14 },
];

const staff = [
  { id: '1', name: 'Jason Kempson', role: 'Director', email: 'alex.morgan@baycityfc.com' },
  { id: '2', name: 'Jaron Kempson', role: 'Coach', email: 'bruce.arena@baycityfc.com' },
  { id: '3', name: 'Chris Woolard', role: 'Coach', email: 'mia.hamm@baycityfc.com' },
];

// --- Sub-Components ---
// Breaking down the UI into smaller components makes it easier to read and maintain.

const Header = () => (
  <div className="flex flex-col sm:flex-row items-center justify-between p-4 mb-8 bg-white rounded-lg shadow-md">
    <div className="flex items-center">
      {organization.logoUrl ? (
        <img src={organization.logoUrl} alt={`${organization.name} Logo`} className="w-16 h-16 mr-4 rounded-full" />
      ) : (
        <div className="w-16 h-16 mr-4 bg-gray-200 rounded-full flex items-center justify-center">
          <Shield className="w-8 h-8 text-gray-500" />
        </div>
      )}
      <h1 className="text-3xl font-bold text-gray-800">{organization.name}</h1>
    </div>
    <button className="flex items-center px-4 py-2 mt-4 sm:mt-0 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200">
      <Pen className="w-4 h-4 mr-2" />
      Edit Organization
    </button>
  </div>
);

const TeamCard = ({ team }: { team: typeof teams[0] }) => (
  <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow">
    <h3 className="text-lg font-bold text-gray-800">{team.name}</h3>
    <p className="text-sm text-gray-600">{team.ageGroup}</p>
    <div className="flex items-center mt-3 text-sm text-gray-500">
      <Users className="w-4 h-4 mr-2" />
      <span>{team.rosterSize} Players</span>
    </div>
  </div>
);

const StaffCard = ({ member }: { member: typeof staff[0] }) => (
  <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
    <h3 className="text-lg font-bold text-gray-800">{member.name}</h3>
    <p className="text-sm font-semibold text-indigo-600">{member.role}</p>
    <p className="mt-2 text-sm text-gray-500">{member.email}</p>
  </div>
);

// --- Main Page Component ---

export default function OrganizationDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <Header />

        {/* Teams Section */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-700">Teams</h2>
            <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <Plus className="w-4 h-4 mr-2" />
              Add New Team
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {teams.map((team) => (
              <TeamCard key={team.id} team={team} />
            ))}
          </div>
        </div>

        {/* Staff Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-700">Staff</h2>
            <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <Plus className="w-4 h-4 mr-2" />
              Invite User
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {staff.map((member) => (
              <StaffCard key={member.id} member={member} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
