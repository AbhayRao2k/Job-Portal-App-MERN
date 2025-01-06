import React from "react";

function Footer() {
  return (
    <footer className="py-12 bg-white">
      <div className="mx-auto px-4 text-center text-black">
        <p>&copy; {new Date().getFullYear()} Job Hunter. All Rights Reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
