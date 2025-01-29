
import React from 'react'
import "./dashboard.css"


export default async function layout ( props ) {

  const isLoggedIn = true;

  const {children, notifications, contact_us, revenue, users} = props;

  return  isLoggedIn ? (
    <>       
            {/* {children} */}
            {/* {notifications}
            {contact_us}
            {revenue}
            {users} */}

      <div className="dashboard">
        <header className="dashboard-header">
          {children}
        </header>

      <div className="dashboard-grid">
        {/* Notifications Section */}
        <section className="dashboard-section notifications">
          <div>{notifications}</div>
          <ul>
            <li>You have 3 new messages</li>
            <li>Your report is ready for download</li>
            <li>System update scheduled at 3 PM</li>
          </ul>
        </section> 

        {/* Revenue Section */}
        <section className="dashboard-section revenue">
          <div>{revenue}</div>
          <p>Today's Revenue: <strong>$2,453</strong></p>
          <p>This Month: <strong>$45,678</strong></p>
        </section>

        {/* Users Section */}
        <section className="dashboard-section users">
          <div>{users}</div>
          <p>Active Users: <strong>1,234</strong></p>
          <p>New Signups: <strong>56</strong></p>
        </section>

        {/* Contact Us Section */}
        <section className="dashboard-section contact_us">
          <div>{contact_us}</div>
          <button className="contact-btn">Google</button>
          <button className="contact-btn">GitHub</button>
        </section>
      </div>
    </div>

        {/* <footer>Dashboard Footer</footer> */}
    </>
  ) :
  (login)
};

export const metadata = {
    title : "Main Dashboard",
    description:"MetaData"
}
