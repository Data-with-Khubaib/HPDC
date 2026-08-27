'use client';
import { use, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronRight, Building2, Hash, MapPin, Briefcase, Award, Clock, Pencil } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { getApplicationById } from '@/lib/mock-data/applications';
import { currentUser } from '@/lib/mock-data/user';

export default function ApplicationDetailPage({ params }) {
  const resolvedParams = use(params);
  const application = getApplicationById(resolvedParams.id);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const textareaRef = useRef(null);

  if (!application) {
    return (
      <div className="animate-slide-up">
        <p className="text-[#6B7280]">Application not found.</p>
      </div>
    );
  }

  const handlePostComment = () => {
    if (!commentText.trim()) return;
    const newComment = {
      id: Date.now().toString(),
      text: commentText.trim(),
      author: currentUser.name,
      initials: currentUser.initials,
      timestamp: new Date(),
      edited: false,
    };
    setComments((prev) => [...prev, newComment]);
    setCommentText('');
  };

  const handleEditComment = (comment) => {
    setEditingId(comment.id);
    setEditText(comment.text);
  };

  const handleSaveEdit = (commentId) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === commentId ? { ...c, text: editText.trim(), edited: true } : c
      )
    );
    setEditingId(null);
    setEditText('');
  };

  const canEdit = (comment) => {
    const diff = Date.now() - new Date(comment.timestamp).getTime();
    return diff < 15 * 60 * 1000; // 15 minutes
  };

  const getEditTimeLeft = (comment) => {
    const diff = 15 * 60 * 1000 - (Date.now() - new Date(comment.timestamp).getTime());
    if (diff <= 0) return null;
    const mins = Math.floor(diff / 60000);
    const secs = Math.floor((diff % 60000) / 1000);
    return `${mins}:${String(secs).padStart(2, '0')}`;
  };

  const aboutFields = [
    { label: 'COMPANY NAME', value: application.companyName, icon: Building2 },
    { label: 'REGISTRATION NUMBER', value: application.registrationNumber || '—', icon: Hash },
    { label: 'ADDRESS', value: application.address, icon: MapPin },
    { label: 'PRODUCT AND SERVICES', value: application.productAndServices, icon: Briefcase },
    { label: 'CERTIFICATE TYPE', value: application.certificateType, icon: Award },
  ];

  return (
    <div className="animate-slide-up">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-6">
        <Link href="/company/applications" className="text-[#6B7280] hover:text-[#111827] transition-colors">
          All Application
        </Link>
        <ChevronRight size={14} className="text-[#6B7280]" />
        <span className="text-[#111827] font-medium">{application.applicationNo}</span>
        <div className="ml-auto">
          <Badge status={application.status} />
        </div>
      </div>

      {/* Two column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: About Application */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
          <h2 className="text-base font-bold text-[#111827] mb-4">About Application</h2>
          <div className="space-y-4">
            {aboutFields.map(({ label, value, icon: Icon }) => (
              <div key={label} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] flex items-center justify-center shrink-0 mt-0.5">
                  <Icon size={14} className="text-[#6B7280]" />
                </div>
                <div>
                  <p className="text-[10px] font-medium text-[#6B7280] uppercase tracking-wider">{label}</p>
                  <p className="text-sm text-[#111827] font-medium mt-0.5">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Activity Timeline */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
          <h2 className="text-base font-bold text-[#111827] mb-4">Activity Timeline</h2>
          <div className="relative">
            {application.timeline.map((event, idx) => (
              <div key={idx} className="flex gap-4 pb-6 last:pb-0">
                {/* Dot + Line */}
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-[#2D6A4F] mt-1.5 shrink-0" />
                  {idx < application.timeline.length - 1 && (
                    <div className="w-px flex-1 bg-[#E5E7EB] mt-1" />
                  )}
                </div>
                {/* Content */}
                <div>
                  <p className="text-sm font-semibold text-[#111827]">{event.action}</p>
                  <p className="text-sm text-[#6B7280] mt-0.5">{event.description}</p>
                  <p className="text-xs text-[#6B7280] mt-1 flex items-center gap-1">
                    <Clock size={12} />
                    {event.date} • {event.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 mt-6">
        <h2 className="text-base font-bold text-[#111827] mb-2">Comments</h2>
        <p className="text-xs text-[#6B7280] mb-6">
          Comments are private until tagged and won&apos;t be visible to the company. Comments cannot be deleted, but you can edit your comment within 15 minutes of posting.
        </p>

        {/* Comment list */}
        {comments.length === 0 ? (
          <p className="text-sm text-[#6B7280] text-center py-6">No comments yet</p>
        ) : (
          <div className="space-y-4 mb-6">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[#1B4332] flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {comment.initials}
                </div>
                <div className="flex-1">
                  {editingId === comment.id ? (
                    <div>
                      <textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        maxLength={500}
                        className="w-full px-3 py-2 text-sm border border-[#E5E7EB] rounded-lg bg-white text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]/20 focus:border-[#2D6A4F] resize-none"
                        rows={3}
                      />
                      <div className="flex gap-2 mt-2">
                        <Button size="sm" variant="solid" onClick={() => handleSaveEdit(comment.id)}>
                          Save
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="text-sm text-[#111827]">{comment.text}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-[#6B7280]">
                          {new Date(comment.timestamp).toLocaleString()}
                        </span>
                        {comment.edited && (
                          <span className="text-xs text-[#6B7280]">(edited)</span>
                        )}
                        {canEdit(comment) && (
                          <button
                            onClick={() => handleEditComment(comment)}
                            className="flex items-center gap-1 text-xs text-[#2D6A4F] hover:underline cursor-pointer"
                          >
                            <Pencil size={10} />
                            Edit
                            <span className="text-[#6B7280] ml-1">
                              ({getEditTimeLeft(comment)} left)
                            </span>
                          </button>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Comment Input */}
        <div className="border-t border-gray-100 pt-4">
          <textarea
            ref={textareaRef}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            maxLength={500}
            placeholder="Write a comment..."
            className="w-full px-3 py-2.5 text-sm border border-[#E5E7EB] rounded-lg bg-white text-[#111827] placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]/20 focus:border-[#2D6A4F] resize-none"
            rows={3}
          />
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-[#6B7280]">{commentText.length}/500</span>
            <Button
              size="sm"
              variant="solid"
              onClick={handlePostComment}
              disabled={!commentText.trim()}
            >
              Post Comment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
