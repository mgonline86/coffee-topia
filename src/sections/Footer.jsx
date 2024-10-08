import React from 'react';

const Footer = () => {
  const footerStyle = {
    backgroundColor: '#2b2b2b',
    color: '#f5f5f5',
    textAlign: 'center',
    padding: '40px 20px',
    position: 'relative',
    bottom: '0',
    width: '100%',
  };

  const containerStyle = {
    maxWidth: '800px',
    margin: '0 auto',
  };

  const titleStyle = {
    fontSize: '2.5rem',
    marginBottom: '10px',
  };

  const descriptionStyle = {
    fontSize: '1.2rem',
    marginBottom: '20px',
  };

  const linksStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
    marginBottom: '20px',
  };

  const linkStyle = {
    color: '#f5f5f5',
    textDecoration: 'none',
    transition: 'color 0.3s',
  };

  const linkHoverStyle = {
    color: '#d3a96d',
  };

  const bottomStyle = {
    fontSize: '14px',
    borderTop: '1px solid #444',
    paddingTop: '10px',
  };

  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <h1 style={titleStyle}>Coffeetopia</h1>
        <p style={descriptionStyle}>
          Your daily dose of coffee perfection. Brewed with love!
        </p>
      </div>
      <div style={bottomStyle}>
        <p>&copy; {new Date().getFullYear()} Coffeetopia. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
