import React, { useState, useEffect } from "react";
import {
  MessageSquare,
  Search,
  Mail,
  Phone,
  Building,
  Trash2,
  Eye,
  X,
  AlertCircle,
} from "lucide-react";
import adminService from "../../services/adminService";
import { useAdminData } from "../../context/AdminDataContext";

export default function AdminInquiries() {
  const {
    inquiries,
    inquiriesLoading,
    inquiriesError,
    fetchInquiries,
    updateInquiryStatus,
    deleteInquiry,
    searchQuery: globalSearch,
  } = useAdminData();

  const [localSearch, setLocalSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [adminNotes, setAdminNotes] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  const handleOpenDetail = (inquiry) => {
    setSelectedInquiry(inquiry);
    setAdminNotes(inquiry.notes || "");
  };

  const handleUpdateStatus = async (id, newStatus) => {
    await updateInquiryStatus(id, newStatus, adminNotes);
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry({ ...selectedInquiry, status: newStatus, isSeen: true, notes: adminNotes });
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedInquiry) return;
    await updateInquiryStatus(selectedInquiry.id, selectedInquiry.status, adminNotes);
  };

  const handleDelete = async () => {
    if (deleteId) {
      await deleteInquiry(deleteId);
      if (selectedInquiry && selectedInquiry.id === deleteId) {
        setSelectedInquiry(null);
      }
      setDeleteId(null);
    }
  };

  const activeSearch = (localSearch || globalSearch || "").toLowerCase();

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch =
      inq.name.toLowerCase().includes(activeSearch) ||
      inq.email.toLowerCase().includes(activeSearch) ||
      inq.phone.toLowerCase().includes(activeSearch) ||
      inq.projectInterest.toLowerCase().includes(activeSearch) ||
      inq.message.toLowerCase().includes(activeSearch);

    const matchesStatus = statusFilter === "All" || inq.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const newCount = inquiries.filter((i) => i.status === "New" || !i.isSeen).length;
  const contactedCount = inquiries.filter((i) => i.status === "Contacted").length;
  const resolvedCount = inquiries.filter((i) => i.status === "Resolved" || i.isSeen).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-300 font-sans text-[#111111]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200/80 pb-6">
        <div>
          <h1 className="text-2xl font-bold font-serif text-[#111111] flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-[#c59a5b]" />
            Client Inquiries Section
          </h1>
          <p className="text-xs text-[#6b6b6b] mt-1">
            Review and manage enquiry submissions via Devang Backend API (/api/contact).
          </p>
        </div>

        {/* Counter Pills */}
        <div className="flex items-center gap-2 font-mono">
          <span className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-800">
            {newCount} New
          </span>
          <span className="rounded-xl border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-800">
            {contactedCount} Contacted
          </span>
          <span className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-800">
            {resolvedCount} Resolved
          </span>
        </div>
      </div>

      {/* Error Alert */}
      {inquiriesError && (
        <div className="flex items-center gap-3 rounded-2xl bg-red-50 border border-red-200 p-4 text-xs text-red-700">
          <AlertCircle className="h-5 w-5 text-red-500 shrink-0" />
          <div>
            <p className="font-bold">API Connection Error</p>
            <p>{inquiriesError}</p>
          </div>
        </div>
      )}

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 rounded-2xl border border-gray-200/80 bg-white p-4 shadow-xs">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Search by client name, email, phone, or project..."
            className="w-full rounded-xl border border-gray-200 bg-[#f8f7f4] py-2.5 pl-10 pr-4 text-xs sm:text-sm text-[#111111] placeholder-gray-400 focus:border-[#c59a5b] focus:bg-white focus:outline-none transition-all"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1 rounded-xl border border-gray-200 bg-[#f8f7f4] p-1">
          {["All", "New", "Contacted", "Resolved"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
                statusFilter === st
                  ? "bg-[#c59a5b] text-white font-bold"
                  : "text-[#6b6b6b] hover:text-[#111111]"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Data Table */}
      {inquiriesLoading && inquiries.length === 0 ? (
        <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-gray-200 bg-white">
          <div className="text-sm font-medium text-[#8a8a8a] animate-pulse">
            Loading client inquiries...
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-gray-200/80 bg-white shadow-xs">
          {filteredInquiries.length > 0 ? (
            <div className="overflow-x-auto overflow-y-auto max-h-[350px]">
              <table className="w-full text-left text-xs min-w-[700px]">
                <thead className="sticky top-0 z-10 border-b border-gray-100 bg-[#f8f7f4] text-[11px] font-bold uppercase tracking-wider text-[#8a8a8a] font-mono shadow-xs">
                  <tr>
                    <th className="p-4">Client Information</th>
                    <th className="p-4">Project Interest</th>
                    <th className="p-4">Submission Date</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredInquiries.map((inq) => (
                    <tr key={inq.id} className="hover:bg-[#f8f7f4]/60 transition-colors">
                      {/* Name & Contact */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f5e4cf]/80 font-bold text-[#a2793f] text-xs shrink-0 font-serif">
                            {inq.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-[#111111] text-sm">{inq.name}</p>
                            <div className="flex items-center gap-3 mt-0.5 text-[#6b6b6b] text-[11px]">
                              <span className="flex items-center gap-1">
                                <Mail className="h-3 w-3 text-gray-400" />
                                {inq.email}
                              </span>
                              <span className="flex items-center gap-1">
                                <Phone className="h-3 w-3 text-gray-400" />
                                {inq.phone}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Project Interest */}
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-[#f8f7f4] px-2.5 py-1 text-xs font-semibold text-[#111111]">
                          <Building className="h-3.5 w-3.5 text-[#c59a5b]" />
                          {inq.projectInterest}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="p-4 text-[#6b6b6b] whitespace-nowrap">
                        {new Date(inq.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>

                      {/* Status */}
                      <td className="p-4">
                        <span
                          className={`inline-block rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider ${
                            inq.status === "New" || !inq.isSeen
                              ? "bg-amber-100 text-amber-800 border border-amber-200"
                              : inq.status === "Contacted"
                              ? "bg-blue-100 text-blue-800 border border-blue-200"
                              : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                          }`}
                        >
                          {inq.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenDetail(inq)}
                            className="flex items-center gap-1 rounded-lg border border-[#c59a5b]/40 bg-[#f5e4cf]/50 px-3 py-1.5 font-bold text-[#a2793f] hover:bg-[#c59a5b] hover:text-white transition-all"
                          >
                            <Eye className="h-3.5 w-3.5" />
                            View
                          </button>
                          <button
                            onClick={() => setDeleteId(inq.id)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all"
                            title="Delete Inquiry"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center text-[#6b6b6b]">
              <MessageSquare className="mx-auto h-12 w-12 text-gray-300 mb-3" />
              <p className="text-sm font-bold font-serif text-[#111111]">No inquiries found</p>
              <p className="text-xs text-[#6b6b6b] mt-1">
                There are no client inquiries matching your search and status filter.
              </p>
            </div>
          )}
        </div>
      )}


      {/* DETAIL VIEW MODAL */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-xl rounded-3xl border border-[#c59a5b]/30 bg-white p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-gray-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold font-serif text-[#111111]">{selectedInquiry.name}</h2>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${
                      selectedInquiry.status === "New"
                        ? "bg-amber-100 text-amber-800"
                        : selectedInquiry.status === "Contacted"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-emerald-100 text-emerald-800"
                    }`}
                  >
                    {selectedInquiry.status}
                  </span>
                </div>
                <p className="text-xs text-[#6b6b6b] mt-1">
                  Submitted on{" "}
                  {new Date(selectedInquiry.createdAt).toLocaleString("en-IN", {
                    dateStyle: "full",
                    timeStyle: "short",
                  })}
                </p>
              </div>

              <button
                onClick={() => setSelectedInquiry(null)}
                className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-[#111111]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <a
                href={`mailto:${selectedInquiry.email}`}
                className="flex items-center gap-2 rounded-xl border border-gray-200 bg-[#f8f7f4] p-3 text-[#111111] hover:border-[#c59a5b] hover:text-[#c59a5b] transition-all"
              >
                <Mail className="h-4 w-4 text-[#c59a5b]" />
                <span className="truncate">{selectedInquiry.email}</span>
              </a>
              <a
                href={`tel:${selectedInquiry.phone}`}
                className="flex items-center gap-2 rounded-xl border border-gray-200 bg-[#f8f7f4] p-3 text-[#111111] hover:border-[#c59a5b] hover:text-[#c59a5b] transition-all"
              >
                <Phone className="h-4 w-4 text-[#c59a5b]" />
                <span>{selectedInquiry.phone}</span>
              </a>
            </div>

            {/* Project Interest */}
            <div className="space-y-1 text-xs">
              <label className="font-semibold text-[#8a8a8a] uppercase tracking-wider text-[10px] font-mono">
                Project Interest
              </label>
              <div className="rounded-xl border border-gray-200 bg-[#f8f7f4] p-3 text-[#111111] font-semibold">
                {selectedInquiry.projectInterest}
              </div>
            </div>

            {/* Message Body */}
            <div className="space-y-1 text-xs">
              <label className="font-semibold text-[#8a8a8a] uppercase tracking-wider text-[10px] font-mono">
                Client Message
              </label>
              <div className="rounded-xl border border-gray-200 bg-[#f8f7f4] p-4 text-[#111111] leading-relaxed">
                {selectedInquiry.message || "No message body provided."}
              </div>
            </div>

            {/* Status Switcher & Admin Notes */}
            <div className="border-t border-gray-100 pt-4 space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-[#111111]">Update Lead Status & Mark Seen</label>
                <div className="flex items-center gap-2">
                  {["New", "Contacted", "Resolved"].map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => handleUpdateStatus(selectedInquiry.id, st)}
                      className={`flex-1 rounded-xl py-2 font-bold text-xs transition-all ${
                        selectedInquiry.status === st
                          ? "bg-[#c59a5b] text-white shadow-md"
                          : "border border-gray-200 bg-[#f8f7f4] text-[#6b6b6b] hover:text-[#111111]"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#111111]">Admin Internal Notes</label>
                <textarea
                  rows="3"
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Record call summaries, follow-up dates, or client preferences..."
                  className="w-full rounded-xl border border-gray-200 bg-[#f8f7f4] p-3 text-[#111111] placeholder-gray-400 focus:border-[#c59a5b] focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-between border-t border-gray-100 pt-4">
              <button
                onClick={() => setDeleteId(selectedInquiry.id)}
                className="flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2 text-xs font-bold text-red-600 hover:bg-red-600 hover:text-white transition-all"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="rounded-xl border border-gray-200 bg-[#f8f7f4] px-4 py-2 text-xs font-bold text-[#6b6b6b] hover:bg-gray-200"
                >
                  Close
                </button>
                <button
                  onClick={handleSaveNotes}
                  className="rounded-xl bg-[#c59a5b] px-5 py-2 text-xs font-bold text-white hover:bg-[#a2793f] transition-all shadow-md"
                >
                  Save Notes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold font-serif text-[#111111]">Delete Client Inquiry</h3>
            <p className="text-xs text-[#6b6b6b] leading-relaxed">
              Are you sure you want to delete this inquiry from backend database?
            </p>
            <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-4">
              <button
                onClick={() => setDeleteId(null)}
                className="rounded-xl border border-gray-200 bg-[#f8f7f4] px-4 py-2 text-xs font-bold text-[#6b6b6b] hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="rounded-xl bg-red-600 px-5 py-2 text-xs font-bold text-white hover:bg-red-700 transition-all"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
