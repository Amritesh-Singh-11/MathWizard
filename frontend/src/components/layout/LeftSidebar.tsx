import React, { useState } from 'react';
import { DOMAINS_DATA, MathTopic, TOTAL_TOPIC_COUNT } from '../../data/topics';
import { ChevronDown, ChevronRight, Search, Book, Layers, CheckCircle2 } from 'lucide-react';

interface LeftSidebarProps {
  selectedTopic: MathTopic;
  onSelectTopic: (topic: MathTopic) => void;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({ selectedTopic, onSelectTopic }) => {
  const [expandedDomains, setExpandedDomains] = useState<Record<string, boolean>>({
    calculus: true,
    'linear-algebra': true,
  });
  const [searchQuery, setSearchQuery] = useState('');

  const toggleDomain = (domainId: string) => {
    setExpandedDomains((prev) => ({
      ...prev,
      [domainId]: !prev[domainId],
    }));
  };

  const filteredDomains = DOMAINS_DATA.map((domain) => {
    const matchingTopics = domain.topics.filter(
      (topic) =>
        topic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topic.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return {
      ...domain,
      topics: matchingTopics,
    };
  }).filter((domain) => domain.topics.length > 0);

  return (
    <aside className="w-80 h-[calc(100vh-4rem)] bg-[#0c121e]/95 border-r border-slate-800/80 flex flex-col flex-shrink-0 z-20">
      {/* Header & Search */}
      <div className="p-4 border-b border-slate-800/80 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-slate-200 font-semibold text-sm">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>Topic Explorer</span>
          </div>
          <span className="text-[11px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full font-mono">
            {TOTAL_TOPIC_COUNT} Topics
          </span>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search topic or formula..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-900/90 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
          />
        </div>
      </div>

      {/* Domain & Topic Tree */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {filteredDomains.map((domain) => {
          const isExpanded = expandedDomains[domain.id] || searchQuery.length > 0;
          return (
            <div key={domain.id} className="rounded-lg overflow-hidden transition-all duration-200">
              {/* Domain Header */}
              <button
                onClick={() => toggleDomain(domain.id)}
                className="w-full flex items-center justify-between p-2.5 hover:bg-slate-800/50 text-left rounded-md group transition-colors"
              >
                <div className="flex items-center space-x-2.5 min-w-0">
                  <div className="p-1 rounded bg-slate-800/80 text-cyan-400 group-hover:text-cyan-300">
                    <Book className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-semibold text-slate-300 group-hover:text-slate-100 truncate">
                    {domain.name}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-[10px] text-slate-500 bg-slate-900/80 px-1.5 py-0.5 rounded">
                    {domain.topics.length}
                  </span>
                  {isExpanded ? (
                    <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  )}
                </div>
              </button>

              {/* Topics List */}
              {isExpanded && (
                <div className="ml-3 pl-3 border-l border-slate-800/60 my-1 space-y-0.5">
                  {domain.topics.map((topic) => {
                    const isSelected = selectedTopic.id === topic.id;
                    return (
                      <button
                        key={topic.id}
                        onClick={() => onSelectTopic(topic)}
                        className={`w-full flex items-start space-x-2 p-2 rounded-md text-left text-xs transition-all ${
                          isSelected
                            ? 'bg-gradient-to-r from-cyan-500/20 to-violet-500/10 text-cyan-300 font-medium border-l-2 border-cyan-400 shadow-sm'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                        }`}
                      >
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />}
                        <div className="min-w-0">
                          <div className="font-medium truncate">{topic.name}</div>
                          <div className="text-[10px] text-slate-500 truncate leading-tight mt-0.5">
                            {topic.description}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
};
