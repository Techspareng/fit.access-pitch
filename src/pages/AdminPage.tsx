import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getWaitlistEntries, getVenueRegistrations, updateWaitlistStatus, updateVenueStatus } from '../api/adminService';
import { WaitlistEntry, VenueRegistration } from '../types/adminTypes';
import { toast } from 'react-hot-toast';
// Replace react-icons with Material-UI icons
import PeopleIcon from '@mui/icons-material/People';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutButton from '../components/LogoutButton';

const AdminPage: React.FC = () => {
  const { isAuthenticated, logout } = useAuth(); // Add logout to destructuring
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'waitlist' | 'venues'>('waitlist');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [waitlistEntries, setWaitlistEntries] = useState<WaitlistEntry[]>([]);
  const [venueRegistrations, setVenueRegistrations] = useState<VenueRegistration[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Please log in to access admin panel');
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        if (activeTab === 'waitlist') {
          console.log('Fetching waitlist data...');
          const entries = await getWaitlistEntries();
          console.log('Received waitlist entries:', entries);
          // Ensure we're setting an array
          setWaitlistEntries(Array.isArray(entries) ? entries : []);
        } else {
          console.log('Fetching venue data...');
          const venues = await getVenueRegistrations();
          console.log('Received venue registrations:', venues);
          setVenueRegistrations(Array.isArray(venues) ? venues : []);
        }
      } catch (error: any) {
        console.error('Fetch error:', error);
        
        // Handle auth-related errors
        if (
          error.message.includes('log in') ||
          error.message.includes('session expired')
        ) {
          toast.error(error.message);
          navigate('/login');
          return;
        }
        
        toast.error(error.message || 'Failed to fetch data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [activeTab, navigate]);

  const handleStatusChange = async (id: string, newStatus: string, type: 'waitlist' | 'venues') => {
    try {
      if (type === 'waitlist') {
        await updateWaitlistStatus(id, newStatus);
        setWaitlistEntries(entries => 
          entries.map(entry => 
            entry.id === id ? { ...entry, status: newStatus as WaitlistEntry['status'] } : entry
          )
        );
      } else {
        await updateVenueStatus(id, newStatus);
        setVenueRegistrations(venues => 
          venues.map(venue => 
            venue.id === id ? { ...venue, status: newStatus as VenueRegistration['status'] } : venue
          )
        );
      }
      toast.success('Status updated successfully');
    } catch (error) {
      console.error('Update error:', error);
      toast.error('Failed to update status');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const renderWaitlistEntries = () => {
    if (!Array.isArray(waitlistEntries)) {
      console.error('waitlistEntries is not an array:', waitlistEntries);
      return null;
    }

    return waitlistEntries.map((entry) => (
      <tr key={entry.id} className="text-white/90 border-b border-white/5">
        <td className="px-4 py-3">{entry.name}</td>
        <td className="px-4 py-3">{entry.email}</td>
        <td className="px-4 py-3">{entry.phone}</td>
        <td className="px-4 py-3">{entry.created_at}</td>
        <td className="px-4 py-3">
          <span className={`px-2 py-1 rounded-full text-xs ${
            entry.status === 'pending' ? 'bg-yellow-500/20 text-yellow-200' :
            entry.status === 'contacted' ? 'bg-blue-500/20 text-blue-200' :
            entry.status === 'approved' ? 'bg-green-500/20 text-green-200' :
            'bg-red-500/20 text-red-200'
          }`}>
            {entry.status}
          </span>
        </td>
        <td className="px-4 py-3">
          <select
            value={entry.status}
            onChange={(e) => handleStatusChange(entry.id, e.target.value, 'waitlist')}
            className="bg-white/5 border border-white/10 rounded-lg text-white px-2 py-1"
          >
            <option value="pending">Pending</option>
            <option value="contacted">Contacted</option>
            <option value="registered">Registered</option>
          </select>
        </td>
      </tr>
    ));
  };

  const renderVenueRegistrations = () => {
    if (!Array.isArray(venueRegistrations)) {
      console.error('venueRegistrations is not an array:', venueRegistrations);
      return null;
    }

    return venueRegistrations.map((venue) => (
      <tr key={venue.id} className="text-white/90 border-b border-white/5">
        <td className="px-4 py-3">{venue.venueName}</td>
        <td className="px-4 py-3 capitalize">{venue.venueType}</td>
        <td className="px-4 py-3">{venue.location}</td>
        <td className="px-4 py-3">
          <div>{venue.email}</div>
          <div className="text-sm text-white/60">{venue.phone}</div>
        </td>
        <td className="px-4 py-3">
          <span className={`px-2 py-1 rounded-full text-xs ${
            venue.status === 'pending' ? 'bg-yellow-500/20 text-yellow-200' :
            venue.status === 'approved' ? 'bg-green-500/20 text-green-200' :
            'bg-red-500/20 text-red-200'
          }`}>
            {venue.status}
          </span>
        </td>
        <td className="px-4 py-3">
          <select
            value={venue.status}
            onChange={(e) => handleStatusChange(venue.id, e.target.value, 'venues')}
            className="bg-white/5 border border-white/10 rounded-lg text-white px-2 py-1"
          >
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </td>
      </tr>
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-black/20 backdrop-blur-xl border-r border-white/10 p-6 hidden lg:block">
        <div className="flex items-center space-x-3 mb-8">
          <div className="h-8 w-8 bg-white rounded-lg"></div>
          <h1 className="text-white font-bold text-xl">FitAccess</h1>
        </div>

        <nav className="space-y-2">
          <button
            onClick={() => setActiveTab('waitlist')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'waitlist'
                ? 'bg-white/10 text-white'
                : 'text-white/60 hover:bg-white/5 hover:text-white'
            }`}
          >
            <PeopleIcon sx={{ fontSize: 20 }} />
            <span>Waitlist</span>
          </button>
          <button
            onClick={() => setActiveTab('venues')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'venues'
                ? 'bg-white/10 text-white'
                : 'text-white/60 hover:bg-white/5 hover:text-white'
            }`}
          >
            <LocationOnIcon sx={{ fontSize: 20 }} />
            <span>Venues</span>
          </button>
        </nav>

        <LogoutButton className="absolute bottom-6 left-6 right-6" />
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-white/60 hover:text-white"
          >
            <MenuIcon sx={{ fontSize: 24 }} />
          </button>
          <h1 className="text-white font-bold">FitAccess Admin</h1>
          <button className="relative p-2 text-white/60 hover:text-white">
            <NotificationsIcon sx={{ fontSize: 24 }} />
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="border-t border-white/10"
            >
              <nav className="p-4 space-y-2">
                <button
                  onClick={() => {
                    setActiveTab('waitlist');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg bg-white/5 text-white"
                >
                  <PeopleIcon sx={{ fontSize: 20 }} />
                  <span>Waitlist</span>
                </button>
                <button
                  onClick={() => {
                    setActiveTab('venues');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg bg-white/5 text-white"
                >
                  <LocationOnIcon sx={{ fontSize: 20 }} />
                  <span>Venues</span>
                </button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className={`lg:pl-64 min-h-screen ${isMobileMenuOpen ? 'blur-sm' : ''}`}>
        <div className="p-6 pt-20 lg:pt-6 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
          >
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <p className="text-white">Loading...</p>
              </div>
            ) : activeTab === 'waitlist' ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-white border-b border-white/10">
                      <th className="px-4 py-3">Name</th>
                      <th className="px-4 py-3">Email</th>
                      <th className="px-4 py-3">Phone</th>
                      <th className="px-4 py-3">Date</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {renderWaitlistEntries()}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-white border-b border-white/10">
                      <th className="px-4 py-3">Venue</th>
                      <th className="px-4 py-3">Type</th>
                      <th className="px-4 py-3">Location</th>
                      <th className="px-4 py-3">Contact</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {renderVenueRegistrations()}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;