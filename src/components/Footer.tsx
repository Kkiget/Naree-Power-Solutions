export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between">
        <div>
          <h3 className="text-lg font-bold">Detra Solar</h3>
          <p className="mt-2">Solar engineering company specializing in Solar & Storage design and engineering services.</p>
        </div>
        <div>
          <h3 className="text-lg font-bold">Services</h3>
          <ul className="mt-2 space-y-1">
            {["Basic/Conceptual Design Services", "Design Optimisation", "Drawings for Planning Application"].map((service, index) => (
              <li key={index} className="text-gray-400">{service}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold">Quick Links</h3>
          <ul className="mt-2 space-y-1">
            {["About Us", "Services", "News", "Career", "Contact Us"].map((link, index) => (
              <li key={index} className="text-gray-400">{link}</li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
