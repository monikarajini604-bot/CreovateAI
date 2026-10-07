import React, { useState, useMemo, useEffect } from 'react';
import { Search, Filter, X, SlidersHorizontal, ArrowUpDown, Zap, RefreshCw } from 'lucide-react';
import { CreatorCard } from '../components/CreatorCard';

export function ExploreCreatorsPage({
  creators,
  shortlistedIds,
  selectedForCompare,
  onToggleShortlist,
  onToggleCompare,
  onOpenCompareModal,
  onViewProfile,
  onOpenProofPassport,
  onOpenPortfolio,
  onInviteToBrief,
  initialSearch = ''
}) {
  const [search, setSearch] = useState(initialSearch);

  useEffect(() => {
    setSearch(initialSearch || '');
  }, [initialSearch]);
  const [selectedSkill, setSelectedSkill] = useState('');
  const [selectedSpec, setSelectedSpec] = useState('');
  const [selectedTool, setSelectedTool] = useState('');
  const [selectedContentType, setSelectedContentType] = useState('');
  const [selectedPrice, setSelectedPrice] = useState(''); // '<100', '100-150', '>150'
  const [selectedCommercial, setSelectedCommercial] = useState('');
  const [selectedAvailability, setSelectedAvailability] = useState('');
  const [sortBy, setSortBy] = useState('rating'); // 'rating' | 'experience' | 'rate'

  // Extract filter options
  const allSkills = useMemo(() => Array.from(new Set(creators.flatMap(c => c.skills))), [creators]);
  const allSpecs = useMemo(() => Array.from(new Set(creators.map(c => c.specialization))), [creators]);
  const allTools = useMemo(() => Array.from(new Set(creators.flatMap(c => c.tools))), [creators]);
  const allContentTypes = useMemo(() => Array.from(new Set(creators.flatMap(c => c.content_types))), [creators]);

  // Multi-facet filter logic
  const filteredCreators = useMemo(() => {
    let result = [...creators];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.headline.toLowerCase().includes(q) ||
        c.specialization.toLowerCase().includes(q) ||
        c.skills.some(s => s.toLowerCase().includes(q)) ||
        c.tools.some(t => t.toLowerCase().includes(q))
      );
    }

    if (selectedSkill) {
      result = result.filter(c => c.skills.includes(selectedSkill));
    }

    if (selectedSpec) {
      result = result.filter(c => c.specialization === selectedSpec);
    }

    if (selectedTool) {
      result = result.filter(c => c.tools.includes(selectedTool));
    }

    if (selectedContentType) {
      result = result.filter(c => c.content_types.includes(selectedContentType));
    }

    if (selectedPrice) {
      if (selectedPrice === '<100') result = result.filter(c => c.hourly_rate < 100);
      else if (selectedPrice === '100-150') result = result.filter(c => c.hourly_rate >= 100 && c.hourly_rate <= 150);
      else if (selectedPrice === '>150') result = result.filter(c => c.hourly_rate > 150);
    }

    if (selectedCommercial) {
      result = result.filter(c => c.commercial_use.toLowerCase().includes(selectedCommercial.toLowerCase()));
    }

    if (selectedAvailability) {
      result = result.filter(c => (c.availability || 'Available Now').toLowerCase().includes(selectedAvailability.toLowerCase()));
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'experience') return b.experience_years - a.experience_years;
      if (sortBy === 'rate') return a.hourly_rate - b.hourly_rate;
      return 0;
    });

    return result;
  }, [
    creators, search, selectedSkill, selectedSpec, selectedTool,
    selectedContentType, selectedPrice, selectedCommercial, selectedAvailability, sortBy
  ]);

  const activeFilterCount = [
    selectedSkill, selectedSpec, selectedTool, selectedContentType,
    selectedPrice, selectedCommercial, selectedAvailability
  ].filter(Boolean).length;

  const handleResetFilters = () => {
    setSearch('');
    setSelectedSkill('');
    setSelectedSpec('');
    setSelectedTool('');
    setSelectedContentType('');
    setSelectedPrice('');
    setSelectedCommercial('');
    setSelectedAvailability('');
  };

  return (
    <div className="space-y-6 animate-fade-in relative pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading text-white">Discover AI Creators</h1>
          <p className="text-xs text-slate-400 mt-1">
            Search, filter, and inspect verified AI filmmakers, 3D animators, and generative advertising specialists
          </p>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <ArrowUpDown className="w-4 h-4 text-slate-400" />
          <span className="text-xs text-slate-400">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500"
          >
            <option value="rating">Highest Rated</option>
            <option value="experience">Years of AI Experience</option>
            <option value="rate">Hourly Rate (Low to High)</option>
          </select>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="p-5 rounded-3xl bg-[#0c1222] border border-white/10 space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by creator name, model stack, prompt keywords..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {activeFilterCount > 0 && (
            <button
              onClick={handleResetFilters}
              className="px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Clear All Filters ({activeFilterCount})
            </button>
          )}
        </div>

        {/* 7 Filter Selectors Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 text-xs">
          {/* Skill Filter */}
          <select
            value={selectedSkill}
            onChange={(e) => setSelectedSkill(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-slate-300 focus:outline-none focus:border-purple-500 text-xs"
          >
            <option value="">Skill: All</option>
            {allSkills.map(s => <option key={s} value={s}>{s}</option>)}
          </select>

          {/* Specialization Filter */}
          <select
            value={selectedSpec}
            onChange={(e) => setSelectedSpec(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-slate-300 focus:outline-none focus:border-purple-500 text-xs"
          >
            <option value="">Specialization: All</option>
            {allSpecs.map(s => <option key={s} value={s}>{s}</option>)}
          </select>

          {/* AI Tool Filter */}
          <select
            value={selectedTool}
            onChange={(e) => setSelectedTool(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-slate-300 focus:outline-none focus:border-purple-500 text-xs"
          >
            <option value="">Tool / Model: All</option>
            {allTools.map(t => <option key={t} value={t}>{t}</option>)}
          </select>

          {/* Content Type Filter */}
          <select
            value={selectedContentType}
            onChange={(e) => setSelectedContentType(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-slate-300 focus:outline-none focus:border-purple-500 text-xs"
          >
            <option value="">Content: All</option>
            {allContentTypes.map(ct => <option key={ct} value={ct}>{ct}</option>)}
          </select>

          {/* Price / Rate Filter */}
          <select
            value={selectedPrice}
            onChange={(e) => setSelectedPrice(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-slate-300 focus:outline-none focus:border-purple-500 text-xs"
          >
            <option value="">Price: All</option>
            <option value="<100">Under $100/hr</option>
            <option value="100-150">$100 - $150/hr</option>
            <option value=">150">$150+/hr</option>
          </select>

          {/* Commercial Use Filter */}
          <select
            value={selectedCommercial}
            onChange={(e) => setSelectedCommercial(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-slate-300 focus:outline-none focus:border-purple-500 text-xs"
          >
            <option value="">Commercial: All</option>
            <option value="Ready">Commercial Ready</option>
            <option value="Available">Licensing Available</option>
          </select>

          {/* Availability Filter */}
          <select
            value={selectedAvailability}
            onChange={(e) => setSelectedAvailability(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-slate-300 focus:outline-none focus:border-purple-500 text-xs"
          >
            <option value="">Availability: All</option>
            <option value="Available">Available Now</option>
            <option value="Booking">Booking Next Month</option>
          </select>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span>Showing <strong className="text-white">{filteredCreators.length}</strong> AI creators</span>
        {selectedForCompare.length > 0 && (
          <span className="text-purple-400 font-semibold">
            {selectedForCompare.length} selected for comparison
          </span>
        )}
      </div>

      {/* Creator Grid & Empty State */}
      {filteredCreators.length === 0 ? (
        <div className="text-center py-20 p-8 rounded-3xl bg-[#0c1222] border border-white/5 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-purple-950/40 border border-purple-500/20 text-purple-400 mx-auto flex items-center justify-center">
            <Search className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white font-heading">No creators found</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
              Try adjusting your skills, specialization, tools or content type filters.
            </p>
          </div>
          <button
            onClick={handleResetFilters}
            className="px-5 py-2.5 text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white rounded-xl shadow-lg shadow-purple-600/30 transition-all hover:scale-102"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCreators.map((creator) => (
            <CreatorCard
              key={creator.id}
              creator={creator}
              isShortlisted={shortlistedIds.includes(creator.id)}
              isSelectedForCompare={selectedForCompare.includes(creator.id)}
              onToggleShortlist={onToggleShortlist}
              onToggleCompare={onToggleCompare}
              onViewProfile={onViewProfile}
              onOpenProofPassport={onOpenProofPassport}
              onOpenPortfolio={onOpenPortfolio}
              onInviteToBrief={onInviteToBrief}
            />
          ))}
        </div>
      )}

      {/* Floating Comparison Bar */}
      {selectedForCompare.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#0c1324] border border-purple-500/50 px-6 py-3.5 rounded-2xl shadow-2xl shadow-purple-950/60 flex items-center gap-4 backdrop-blur-xl animate-fade-in">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-bold text-white">
              {selectedForCompare.length} Creators Selected
            </span>
          </div>

          <div className="flex items-center -space-x-2">
            {selectedForCompare.map(id => {
              const c = creators.find(cr => cr.id === id);
              if (!c) return null;
              return (
                <img
                  key={id}
                  src={c.avatar_url}
                  alt={c.name}
                  className="w-7 h-7 rounded-full object-cover ring-2 ring-[#0c1324]"
                />
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenCompareModal}
              className="px-4 py-1.5 rounded-lg text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-600/30 transition-all hover:scale-102"
            >
              Compare Matrix
            </button>
            <button
              onClick={() => onToggleCompare('CLEAR_ALL')}
              className="p-1 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
