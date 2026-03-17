import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  PlusCircle,
  Receipt,
  BarChart3,
  Settings,
  LogOut,
  TrendingUp,
} from "lucide-react";
import "./Sidebar.css";

const NAV = [
  {
    group: "Overview",
    items: [
      { to: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={15} /> },
      { to: "/dashboard?tab=reports",   label: "Reports",   icon: <BarChart3 size={15} /> },
    ],
  },
  {
    group: "Manage",
    items: [
      { to: "/dashboard?tab=add",          label: "Add Expense",   icon: <PlusCircle size={15} /> },
      { to: "/dashboard?tab=transactions", label: "Transactions",  icon: <Receipt size={15} /> },
    ],
  },
  {
    group: "System",
    items: [
      { to: "/dashboard?tab=settings", label: "Settings", icon: <Settings size={15} /> },
    ],
  },
];

function Sidebar() {
  const navigate = useNavigate();
  
  const userText = localStorage.getItem("expense_user");
  const user = userText ? JSON.parse(userText) : { name: "Demo User" };
  const initials = user.name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();

  const handleLogout = () => {
    localStorage.removeItem("expense_token");
    localStorage.removeItem("expense_user");
    navigate("/login");
  };
  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">
          <TrendingUp size={16} />
        </div>
        <span className="sidebar-logo-text">SpendSmart</span>
        <span className="sidebar-logo-badge">Pro</span>
      </div>

      {/* Nav */}
      <nav className="sidebar-nav">
        {NAV.map((group) => (
          <div className="sidebar-nav-group" key={group.group}>
            <span className="sidebar-section-label">{group.group}</span>
            <ul className="sidebar-menu">
              {group.items.map(({ to, label, icon }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={to === "/dashboard"}
                    className={({ isActive }) =>
                      "sidebar-item" + (isActive ? " sidebar-item--active" : "")
                    }
                  >
                    <span className="sidebar-item-icon">{icon}</span>
                    <span className="sidebar-item-label">{label}</span>
                    <span className="sidebar-item-indicator" />
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="sidebar-avatar">{initials}</div>
          <div className="sidebar-user-info">
            <p className="sidebar-user-name">{user.name}</p>
            <p className="sidebar-user-role">Pro Plan</p>
          </div>
        </div>
        <button
          className="sidebar-logout"
          onClick={handleLogout}
          title="Sign out"
        >
          <LogOut size={14} />
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;