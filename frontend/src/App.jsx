import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { BriefModal } from './components/BriefModal';
import { ProofPassportModal } from './components/ProofPassportModal';
import { PortfolioDetailModal } from './components/PortfolioDetailModal';
import { CreatorComparisonModal } from './components/CreatorComparisonModal';
import { InviteToBriefModal } from './components/InviteToBriefModal';
import { AIAssistantChatbot } from './components/AIAssistantChatbot';
import { CreateAccountModal } from './components/CreateAccountModal';
import { LoginModal } from './components/LoginModal';

// Pages
import { DashboardPage } from './pages/DashboardPage';
import { ExploreCreatorsPage } from './pages/ExploreCreatorsPage';
import { CreatorProfilePage } from './pages/CreatorProfilePage';
import { CreateBriefPage } from './pages/CreateBriefPage';
import { AIBriefBuilderPage } from './pages/AIBriefBuilderPage';
import { MyBriefsPage } from './pages/MyBriefsPage';
import { SmartMatchesPage } from './pages/SmartMatchesPage';
import { ShortlistPage } from './pages/ShortlistPage';
import { EngagementsPage } from './pages/EngagementsPage';
import { CreatorPortalPage } from './pages/CreatorPortalPage';
import { BrandProfilePage } from './pages/BrandProfilePage';
import { PrivateChatPage } from './pages/PrivateChatPage';
import { WelcomePage } from './pages/WelcomePage';

// Data & API
import { INITIAL_CREATORS, INITIAL_BRIEFS, INITIAL_ENGAGEMENTS, INITIAL_BRANDS, INITIAL_CONVERSATIONS } from './data/mockData';
import { api } from './services/api';

export function App() {
  const [currentRole, setCurrentRole] = useState('brand'); // 'brand' | 'creator'
  const [currentPage, setCurrentPage] = useState(() => {
    try {
      const saved = localStorage.getItem('creovate_current_user');
      if (saved) {
        const user = JSON.parse(saved);
        if (user) {
          return user.role === 'creator' ? 'creator-portal' : 'dashboard';
        }
      }
    } catch {}
    return 'welcome'; // New visitors land on the Welcome Page first
  });
  const [creators, setCreators] = useState(INITIAL_CREATORS);
  const [briefs, setBriefs] = useState(INITIAL_BRIEFS);
  const [brands, setBrands] = useState(INITIAL_BRANDS);
  const [conversations, setConversations] = useState(INITIAL_CONVERSATIONS);
  const [shortlistedIds, setShortlistedIds] = useState(['creator-kai-sterling']);
  const [selectedForCompare, setSelectedForCompare] = useState([]);
  const [engagements, setEngagements] = useState(INITIAL_ENGAGEMENTS);
  const [stats, setStats] = useState(null);

  // Selected item contexts
  const [selectedCreatorId, setSelectedCreatorId] = useState(null);
  const [selectedBriefId, setSelectedBriefId] = useState(null);
  const [selectedBrandId, setSelectedBrandId] = useState('brand-solaria');
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const [globalSearch, setGlobalSearch] = useState('');
  const [creatorPortalTab, setCreatorPortalTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Modals state
  const [isNewBriefModalOpen, setIsNewBriefModalOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [proofPassportCreator, setProofPassportCreator] = useState(null);
  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState(null);
  const [inviteModalCreator, setInviteModalCreator] = useState(null);
  const [isCreateAccountOpen, setIsCreateAccountOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Authenticated user state (null for new visitors until sign in / registration)
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('creovate_current_user');
      if (saved) return JSON.parse(saved);
    } catch {}
    return null;
  });

  const [loginDefaultEmail, setLoginDefaultEmail] = useState('');

  // Protected pages requiring authentication
  const PROTECTED_PAGES = [
    'dashboard',
    'creator-portal',
    'engagements',
    'my-briefs',
    'create-brief-page',
    'ai-brief-builder',
    'shortlist',
    'brand-profile',
    'messages'
  ];

  // Auth Handlers
  const handleLoginSuccess = (account, token) => {
    setCurrentUser(account);
    if (account.role) setCurrentRole(account.role);
    localStorage.setItem('creovate_current_user', JSON.stringify(account));
    if (token) api.setToken(token);
    // Enter the existing platform
    if (account.role === 'creator') setCurrentPage('creator-portal');
    else setCurrentPage('dashboard');
  };

  const handleLogout = async () => {
    const prevEmail = currentUser?.email || '';
    try {
      await api.logout();
    } catch {}
    setCurrentUser(null);
    setLoginDefaultEmail(prevEmail);
    setIsLoginModalOpen(true);
    setCurrentPage('welcome');
  };

  // Initial load & Session Verification
  useEffect(() => {
    async function loadData() {
      // Check active auth session
      const token = api.getToken();
      if (token) {
        try {
          const verifiedUser = await api.getMe();
          if (verifiedUser) {
            setCurrentUser(verifiedUser);
            if (verifiedUser.role) setCurrentRole(verifiedUser.role);
          }
        } catch {
          // Token expired or server unreachable
        }
      }

      try {
        const fetchedCreators = await api.getCreators();
        if (fetchedCreators && fetchedCreators.length > 0) setCreators(fetchedCreators);

        const fetchedBriefs = await api.getBriefs();
        if (fetchedBriefs && fetchedBriefs.length > 0) setBriefs(fetchedBriefs);

        const fetchedBrands = await api.getBrands();
        if (fetchedBrands && fetchedBrands.length > 0) setBrands(fetchedBrands);

        const fetchedConversations = await api.getConversations();
        if (fetchedConversations && fetchedConversations.length > 0) setConversations(fetchedConversations);

        const fetchedEngagements = await api.getEngagements();
        if (fetchedEngagements && fetchedEngagements.length > 0) setEngagements(fetchedEngagements);

        const fetchedStats = await api.getDashboardStats();
        if (fetchedStats) setStats(fetchedStats);
      } catch (err) {
        console.warn('Initial data load completed with local state');
      }
    }
    loadData();
  }, []);

  // Navigation Helper with Protected Route Gate
  const navigate = (page, params = {}) => {
    setIsMobileMenuOpen(false);
    if (PROTECTED_PAGES.includes(page) && !currentUser) {
      setIsLoginModalOpen(true);
      setCurrentPage('welcome');
      return;
    }
    if (params.creatorId) setSelectedCreatorId(params.creatorId);
    if (params.briefId) setSelectedBriefId(params.briefId);
    if (params.brandId) setSelectedBrandId(params.brandId);
    if (params.conversationId) setSelectedConversationId(params.conversationId);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Shortlist Handlers
  const handleToggleShortlist = async (creatorId) => {
    if (shortlistedIds.includes(creatorId)) {
      setShortlistedIds(prev => prev.filter(id => id !== creatorId));
      await api.removeFromShortlist(creatorId);
    } else {
      setShortlistedIds(prev => [...prev, creatorId]);
      await api.addToShortlist(creatorId);
    }
  };

  // Compare Checkbox Handlers
  const handleToggleCompare = (creatorId) => {
    if (creatorId === 'CLEAR_ALL') {
      setSelectedForCompare([]);
      return;
    }
    setSelectedForCompare(prev => {
      if (prev.includes(creatorId)) {
        return prev.filter(id => id !== creatorId);
      } else {
        if (prev.length >= 3) return [...prev.slice(1), creatorId];
        return [...prev, creatorId];
      }
    });
  };

  // Brief creation handler
  const handleSaveBrief = async (briefData) => {
    const saved = await api.createBrief(briefData);
    setBriefs(prev => [saved, ...prev]);
    return saved;
  };

  // Open Invite Modal
  const handleOpenInviteModal = (creator) => {
    setInviteModalCreator(creator);
  };

  // Engagement Handler (Direct or via Invite modal)
  const handleConfirmInvite = async (creator, targetBrief, message = '') => {
    const brief = targetBrief || briefs.find(b => b.id === selectedBriefId) || briefs[0];
    const newEng = await api.createEngagement({
      creator_id: creator.id,
      creator_name: creator.name,
      brief_id: brief?.id,
      campaign_name: brief?.campaign_name || `${creator.name} — AI Campaign`,
      brand_name: brief?.brand_name || 'Solaria Clean Tech',
      budget: brief?.budget || '$4,500',
      total_budget: brief?.budget || '$4,500',
      status: 'Invited',
      current_stage_index: 2,
      deadline: brief?.deadline || '14 business days',
      deliverables: brief?.deliverables || ['1x Master Video (4K)', '2x Social Cuts (9:16)'],
      commercial_license_status: brief?.commercial_use_req || 'Full Commercial Buyout Verified',
      custom_message: message
    });
    setEngagements(prev => [newEng, ...prev]);
    setInviteModalCreator(null);
    navigate('engagements');
  };

  const handleInitiateEngagement = (creator) => {
    handleOpenInviteModal(creator);
  };

  // Advance Engagement Stage
  const handleAdvanceStage = async (engId, newIndex) => {
    const updated = await api.updateEngagement(engId, { current_stage_index: newIndex });
    setEngagements(prev => prev.map(e => e.id === engId ? { ...e, ...updated, current_stage_index: newIndex } : e));
  };

  // Brand Update Handler
  const handleUpdateBrand = async (updatedBrand) => {
    const res = await api.updateBrand(updatedBrand.id, updatedBrand);
    const saved = res.brand || updatedBrand;
    setBrands(prev => prev.map(b => b.id === saved.id ? saved : b));
    return saved;
  };

  // Open Private Chat Handler (from Creator Profile, Brand Profile, or Direct Message Modal)
  const handleOpenChat = async (target = {}) => {
    const activeBrand = brands.find(b => b.id === selectedBrandId) || brands[0];
    const activeCreator = creators.find(c => c.id === selectedCreatorId) || creators[0];

    const currentUserName = currentUser?.name || (currentRole === 'brand' ? activeBrand.name : activeCreator.name);
    const currentUserAvatar = currentUser?.avatar_url || (currentRole === 'brand' ? activeBrand.logo_url : activeCreator.avatar_url);

    let conv = null;

    if (target.conversation_id) {
      conv = conversations.find(c => c.id === target.conversation_id);
    } else if (target.creator_id) {
      // Direct message with a creator
      conv = conversations.find(c => c.creator_id === target.creator_id && c.brand_id === (target.brand_id || activeBrand.id));
      if (!conv) {
        const creator = creators.find(c => c.id === target.creator_id) || { name: target.creator_name, avatar_url: target.creator_avatar };
        const newConvData = {
          brand_id: target.brand_id || activeBrand.id,
          brand_name: (currentRole === 'brand' && currentUserName) ? currentUserName : activeBrand.name,
          brand_logo: (currentRole === 'brand' && currentUserAvatar) ? currentUserAvatar : activeBrand.logo_url,
          creator_id: target.creator_id,
          creator_name: target.creator_name || creator.name,
          creator_avatar: target.creator_avatar || creator.avatar_url,
          campaign_name: target.campaign_name || `${creator.name || 'AI Creator'} — Direct Production`
        };
        const created = await api.createConversation(newConvData);
        conv = created.conversation || created;
        setConversations(prev => [conv, ...prev.filter(c => c.id !== conv.id)]);
      }
    } else if (target.brand_id) {
      // Direct message with a brand
      conv = conversations.find(c => c.brand_id === target.brand_id && c.creator_id === (target.creator_id || activeCreator.id));
      if (!conv) {
        const brand = brands.find(b => b.id === target.brand_id) || { name: target.brand_name, logo_url: target.brand_logo };
        const newConvData = {
          brand_id: target.brand_id,
          brand_name: target.brand_name || brand.name,
          brand_logo: target.brand_logo || brand.logo_url,
          creator_id: target.creator_id || activeCreator.id,
          creator_name: (currentRole === 'creator' && currentUserName) ? currentUserName : activeCreator.name,
          creator_avatar: (currentRole === 'creator' && currentUserAvatar) ? currentUserAvatar : activeCreator.avatar_url,
          campaign_name: target.campaign_name || `${brand.name || 'Brand Partner'} Direct Collaboration`
        };
        const created = await api.createConversation(newConvData);
        conv = created.conversation || created;
        setConversations(prev => [conv, ...prev.filter(c => c.id !== conv.id)]);
      }
    }

    if (conv) {
      setSelectedConversationId(conv.id);
      if (target.initial_message && target.initial_message.trim()) {
        const senderName = currentRole === 'brand' ? conv.brand_name : conv.creator_name;
        const senderId = currentRole === 'brand' ? conv.brand_id : conv.creator_id;
        await handleSendMessage({
          conversation_id: conv.id,
          sender_id: senderId,
          sender_role: currentRole,
          sender_name: senderName,
          text: target.initial_message.trim()
        });
      }
    }
    setCurrentPage('messages');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return conv;
  };

  // Send Message Handler
  const handleSendMessage = async (msgData) => {
    const res = await api.sendMessage(msgData);
    const newMsg = res.message || {
      id: `msg-${Date.now()}`,
      ...msgData,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'delivered'
    };

    setConversations(prev => {
      const idx = prev.findIndex(c => c.id === msgData.conversation_id);
      if (idx === -1) return prev;
      const targetConv = { ...prev[idx] };
      targetConv.messages = [...(targetConv.messages || []), newMsg];
      targetConv.last_message = newMsg.text;
      targetConv.last_message_time = 'Just now';
      targetConv.last_message_timestamp = new Date().toISOString();

      if (currentRole === 'brand') {
        targetConv.unread_count_creator = (targetConv.unread_count_creator || 0) + 1;
      } else {
        targetConv.unread_count_brand = (targetConv.unread_count_brand || 0) + 1;
      }

      const rest = prev.filter((_, i) => i !== idx);
      return [targetConv, ...rest];
    });
  };

  // Mark Conversation Read Handler
  const handleMarkConversationRead = async (convId, userRole) => {
    await api.markConversationRead(convId, userRole);
    setConversations(prev => prev.map(c => {
      if (c.id === convId) {
        return {
          ...c,
          ...(userRole === 'brand' ? { unread_count_brand: 0 } : { unread_count_creator: 0 })
        };
      }
      return c;
    }));
  };

  // Clear Messages in a Conversation
  const handleClearMessages = async (convId) => {
    try {
      await api.clearConversationMessages(convId);
    } catch {}
    setConversations(prev => prev.map(c => {
      if (c.id === convId) {
        return {
          ...c,
          messages: [],
          last_message: '',
          last_message_time: '',
          unread_count_brand: 0,
          unread_count_creator: 0
        };
      }
      return c;
    }));
  };

  // Delete Conversation Handler
  const handleDeleteConversation = async (convId) => {
    try {
      await api.deleteConversation(convId);
    } catch {}
    setConversations(prev => {
      const remaining = prev.filter(c => c.id !== convId);
      if (selectedConversationId === convId) {
        setSelectedConversationId(remaining.length > 0 ? remaining[0].id : null);
      }
      return remaining;
    });
  };

  // Selected Creator for Profile view
  const currentCreator = creators.find(c => c.id === selectedCreatorId) || creators[0];
  const currentBrand = brands.find(b => b.id === selectedBrandId) || brands[0];
  const shortlistedCreators = creators.filter(c => shortlistedIds.includes(c.id));
  const comparedCreators = creators.filter(c => selectedForCompare.includes(c.id));

  const unreadMessagesCount = conversations.reduce((acc, c) => {
    return acc + (currentRole === 'brand' ? (c.unread_count_brand || 0) : (c.unread_count_creator || 0));
  }, 0);

  return (
    <div className="min-h-screen bg-[#080d19] text-slate-100 flex flex-col font-sans">
      {/* WCAG AAA Skip to Content for Keyboard and Screen-Reader Accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Top Navbar */}
      <Navbar
        currentRole={currentRole}
        onSwitchRole={(role) => {
          setCurrentRole(role);
          if (role === 'creator') setCurrentPage('creator-portal');
          else setCurrentPage('dashboard');
        }}
        onOpenNewBriefModal={() => setCurrentPage('create-brief-page')}
        onOpenCreateAccount={() => setIsCreateAccountOpen(true)}
        onNavigate={navigate}
        searchTerm={globalSearch}
        onSearchChange={(q) => {
          setGlobalSearch(q);
          if (currentPage !== 'explore') setCurrentPage('explore');
        }}
        unreadMessagesCount={unreadMessagesCount}
        currentUser={currentUser}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onLogout={handleLogout}
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={() => setIsMobileMenuOpen(prev => !prev)}
      />

      <div className="flex flex-1">
        {/* Left Sidebar - hidden on Welcome Page for clean landing experience */}
        {currentPage !== 'welcome' && (
          <Sidebar
            currentPage={currentPage}
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
            onNavigate={(target) => {
              setIsMobileMenuOpen(false);
              if (target === 'creator-profile-view') {
                setSelectedCreatorId(creators[0].id);
                setCreatorPortalTab('profile');
                setCurrentPage('creator-portal');
              } else if (target === 'creator-portfolio-view') {
                setSelectedCreatorId(creators[0].id);
                setCreatorPortalTab('portfolio');
                setCurrentPage('creator-portal');
              } else if (target === 'creator-tools-view') {
                setCreatorPortalTab('tools');
                setCurrentPage('creator-portal');
              } else if (target === 'creator-portal-proof') {
                setCreatorPortalTab('passport');
                setCurrentPage('creator-portal');
              } else if (target === 'creator-portal') {
                setCreatorPortalTab('dashboard');
                setCurrentPage('creator-portal');
              } else if (target === 'brand-profile') {
                setCurrentPage('brand-profile');
              } else if (target === 'messages') {
                setCurrentPage('messages');
              } else {
                navigate(target);
              }
            }}
            currentRole={currentRole}
            counts={{
              shortlisted: shortlistedIds.length,
              briefs: briefs.length,
              engagements: engagements.length,
              unreadMessages: unreadMessagesCount
            }}
          />
        )}

        {/* Main Content Area */}
        <main
          id="main-content"
          tabIndex="-1"
          role="main"
          className={`flex-1 min-w-0 p-4 lg:p-8 outline-none ${currentPage === 'welcome' ? 'max-w-6xl mx-auto w-full' : 'max-w-7xl mx-auto w-full'}`}
        >
          {currentPage === 'welcome' && (
            <WelcomePage
              onGetStarted={() => setIsLoginModalOpen(true)}
              onOpenLogin={() => setIsLoginModalOpen(true)}
              onOpenCreateAccount={() => setIsCreateAccountOpen(true)}
              creators={creators}
            />
          )}

          {currentPage === 'dashboard' && (
            <DashboardPage
              creators={creators}
              briefs={briefs}
              shortlistedIds={shortlistedIds}
              engagements={engagements}
              stats={stats}
              onNavigate={navigate}
              onViewProfile={(id) => navigate('creator-profile', { creatorId: id })}
              onToggleShortlist={handleToggleShortlist}
              onOpenProofPassport={(creator) => setProofPassportCreator(creator)}
              onOpenPortfolio={(item) => setSelectedPortfolioItem(item)}
              onInviteToBrief={handleOpenInviteModal}
            />
          )}

          {currentPage === 'explore' && (
            <ExploreCreatorsPage
              creators={creators}
              shortlistedIds={shortlistedIds}
              selectedForCompare={selectedForCompare}
              onToggleShortlist={handleToggleShortlist}
              onToggleCompare={handleToggleCompare}
              onOpenCompareModal={() => setIsCompareModalOpen(true)}
              onViewProfile={(id) => navigate('creator-profile', { creatorId: id })}
              onOpenProofPassport={(creator) => setProofPassportCreator(creator)}
              onOpenPortfolio={(item) => setSelectedPortfolioItem(item)}
              onInviteToBrief={handleOpenInviteModal}
              initialSearch={globalSearch}
            />
          )}

          {currentPage === 'creator-profile' && (
            <CreatorProfilePage
              creator={currentCreator}
              isShortlisted={shortlistedIds.includes(currentCreator?.id)}
              onToggleShortlist={handleToggleShortlist}
              onOpenProofPassport={(creator) => setProofPassportCreator(creator)}
              onOpenPortfolio={(item) => setSelectedPortfolioItem(item)}
              onInitiateEngagement={handleInitiateEngagement}
              onOpenChat={handleOpenChat}
              onUpdateCreator={(updated) => {
                setCreators(prev => prev.map(c => c.id === updated.id ? updated : c));
              }}
            />
          )}

          {currentPage === 'brand-profile' && (
            <BrandProfilePage
              brand={currentBrand}
              briefs={briefs}
              onUpdateBrand={handleUpdateBrand}
              onOpenChat={handleOpenChat}
              onNavigate={navigate}
              isOwnProfile={currentRole === 'brand'}
            />
          )}

          {currentPage === 'messages' && (
            <PrivateChatPage
              conversations={conversations}
              selectedConversationId={selectedConversationId}
              currentRole={currentRole}
              creators={creators}
              brands={brands}
              onSendMessage={handleSendMessage}
              onOpenChat={handleOpenChat}
              onDeleteConversation={handleDeleteConversation}
              onMarkRead={handleMarkConversationRead}
              onSelectConversation={(id) => setSelectedConversationId(id)}
              onViewProfile={(targetPage, targetParams) => navigate(targetPage, targetParams)}
              currentUser={currentUser}
              onOpenLogin={() => setIsLoginModalOpen(true)}
              onOpenCreateAccount={() => setIsCreateAccountOpen(true)}
              onClearMessages={handleClearMessages}
            />
          )}

          {currentPage === 'create-brief-page' && (
            <CreateBriefPage
              onSaveBrief={handleSaveBrief}
              onFindBestCreators={(briefId) => {
                navigate('smart-matches', { briefId });
              }}
            />
          )}

          {currentPage === 'ai-brief-builder' && (
            <AIBriefBuilderPage
              onSaveBrief={handleSaveBrief}
              onFindBestCreators={(briefId) => {
                navigate('smart-matches', { briefId });
              }}
            />
          )}

          {currentPage === 'my-briefs' && (
            <MyBriefsPage
              briefs={briefs}
              onOpenNewBriefModal={() => setCurrentPage('create-brief-page')}
              onFindBestCreators={(briefId) => navigate('smart-matches', { briefId })}
            />
          )}

          {currentPage === 'smart-matches' && (
            <SmartMatchesPage
              briefs={briefs}
              selectedBriefId={selectedBriefId}
              creators={creators}
              shortlistedIds={shortlistedIds}
              selectedForCompare={selectedForCompare}
              onToggleShortlist={handleToggleShortlist}
              onToggleCompare={handleToggleCompare}
              onOpenCompareModal={() => setIsCompareModalOpen(true)}
              onViewProfile={(id) => navigate('creator-profile', { creatorId: id })}
              onOpenProofPassport={(creator) => setProofPassportCreator(creator)}
              onOpenPortfolio={(item) => setSelectedPortfolioItem(item)}
              onInitiateEngagement={handleInitiateEngagement}
            />
          )}

          {currentPage === 'shortlist' && (
            <ShortlistPage
              shortlistedCreators={shortlistedCreators}
              onRemoveFromShortlist={handleToggleShortlist}
              onOpenCompareModal={() => {
                setSelectedForCompare(shortlistedIds.slice(0, 3));
                setIsCompareModalOpen(true);
              }}
              onViewProfile={(id) => navigate('creator-profile', { creatorId: id })}
              onInitiateEngagement={handleInitiateEngagement}
              onOpenProofPassport={(creator) => setProofPassportCreator(creator)}
              onNavigate={navigate}
            />
          )}

          {currentPage === 'engagements' && (
            <EngagementsPage
              engagements={engagements}
              onAdvanceStage={handleAdvanceStage}
              onOpenChat={handleOpenChat}
            />
          )}

          {currentPage === 'creator-portal' && (
            <CreatorPortalPage
              creator={creators[0]} // Kai Sterling view for creator studio
              briefs={briefs}
              engagements={engagements}
              initialTab={creatorPortalTab}
              onUpdateCreator={(updated) => {
                setCreators(prev => prev.map(c => c.id === updated.id ? updated : c));
              }}
              onNavigate={navigate}
            />
          )}
        </main>
      </div>

      {/* Global Modals */}
      <BriefModal
        isOpen={isNewBriefModalOpen}
        onClose={() => setIsNewBriefModalOpen(false)}
        onSave={async (briefData) => {
          const saved = await handleSaveBrief(briefData);
          navigate('smart-matches', { briefId: saved.id });
        }}
      />

      <ProofPassportModal
        creator={proofPassportCreator}
        isOpen={!!proofPassportCreator}
        onClose={() => setProofPassportCreator(null)}
      />

      <PortfolioDetailModal
        item={selectedPortfolioItem}
        isOpen={!!selectedPortfolioItem}
        onClose={() => setSelectedPortfolioItem(null)}
        onShortlistCreator={handleToggleShortlist}
      />

      <CreatorComparisonModal
        creators={comparedCreators.length > 0 ? comparedCreators : shortlistedCreators.slice(0, 3)}
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        onShortlist={handleToggleShortlist}
        onViewProfile={(id) => {
          setIsCompareModalOpen(false);
          navigate('creator-profile', { creatorId: id });
        }}
        onEngage={(c) => {
          setIsCompareModalOpen(false);
          handleOpenInviteModal(c);
        }}
      />

      <InviteToBriefModal
        isOpen={!!inviteModalCreator}
        creator={inviteModalCreator}
        briefs={briefs}
        onClose={() => setInviteModalCreator(null)}
        onConfirmInvite={handleConfirmInvite}
      />

      {/* Floating Creovate AI Assistant Chatbot */}
      <AIAssistantChatbot
        onNavigate={navigate}
        onOpenCreateAccount={() => setIsCreateAccountOpen(true)}
        onApplyFilter={(action) => {
          if (action.tool || action.search || action.spec || action.contentType) {
            setGlobalSearch(action.tool || action.search || action.spec || action.contentType || '');
          }
          navigate(action.page || 'explore');
        }}
        currentRole={currentRole}
      />

      {/* Create Account / Sign Up Modal */}
      <CreateAccountModal
        isOpen={isCreateAccountOpen}
        onClose={() => setIsCreateAccountOpen(false)}
        onOpenLogin={() => {
          setIsCreateAccountOpen(false);
          setIsLoginModalOpen(true);
        }}
        onAccountCreated={(role, newEntity, token) => {
          setIsCreateAccountOpen(false);
          if (newEntity) {
            handleLoginSuccess(newEntity, token);
          }
          if (role === 'creator') {
            if (newEntity) setCreators(prev => [newEntity, ...prev]);
            setSelectedCreatorId(newEntity?.id);
            setCurrentPage('creator-portal');
          } else {
            if (newEntity) setBrands(prev => [newEntity, ...prev]);
            setSelectedBrandId(newEntity?.id);
            setCurrentPage('brand-profile');
          }
          setIsCreateAccountOpen(false);
        }}
        existingCreators={creators}
        existingBrands={brands}
      />

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        defaultEmail={loginDefaultEmail}
        onOpenCreateAccount={() => {
          setIsLoginModalOpen(false);
          setIsCreateAccountOpen(true);
        }}
      />
    </div>
  );
}

export default App;
