function Footer() {
  const year = new Date().getFullYear();
  return (
    <>
      <footer className="bg-white py-4 text-center">
        <p className="text-sm">
          &copy; {year}, powered by{" "}
          <a
            href="https://leomofthings.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold hover:text-blue-300"
          >
            Leomofthings
          </a>
          .
        </p>
      </footer>
    </>
  );
}

export default Footer;