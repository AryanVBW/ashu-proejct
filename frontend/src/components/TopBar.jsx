import React from "react";
import { Bell, Search, Calendar, Settings, Smile } from "lucide-react";
import "./TopBar.css";

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function TopBar() {
  const now = new Date();
  const date = now.toLocaleDateString("en-IN", {
    weekday: "long", day: "numeric", month: "long"
  });

  const userText = localStorage.getItem("expense_user");
  const user = userText ? JSON.parse(userText) : { name: "Guest" };
  const firstName = user.name.split(" ")[0];

  return (
    <header className="topbar">
      <div className="topbar-left">
        <p className="topbar-greeting" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {getGreeting()}, <span>{firstName}</span> <Smile size={18} color="#f59e0b" />
        </p>
        <p className="topbar-sub">{date}</p>
      </div>

      <div className="topbar-right">
        {/* Period picker */}
        <button className="topbar-period">
          <Calendar size={13} />
          March 2026
        </button>

        {/* Search */}
        <button className="topbar-iconbtn" title="Search">
          <Search size={15} />
        </button>

        {/* Notifications */}
        <button className="topbar-iconbtn" title="Notifications">
          <Bell size={15} />
          <span className="topbar-notif-dot" />
        </button>

        <div className="topbar-divider" />

        {/* Avatar */}
        <div className="topbar-avatar" title="Vivek W.">V</div>
      </div>
    </header>
  );
}

export default TopBar;
