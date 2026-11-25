const ADDRESS = "E.C Ouano Sr. Complex, Barangay Bajumpandan, 6200";
const PHONE = "(035) 541 0762";
const EMAIL = "dilgnegrosoriental2024@gmail.com";
const FACEBOOK = "DILG - Negros Oriental";

export default function Contact() {
  return (
    <section className="page">
      <h1 className="title l">CONTACT</h1>
      <div className="box">
        <h2 className="h2">DILG Negros Oriental Provincial Office</h2>
        <ul className="contact">
          <li>
            <span className="lbl">Address</span>
            <a href={"https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(ADDRESS)} target="_blank" rel="noopener noreferrer">{ADDRESS}</a>
          </li>
          <li>
            <span className="lbl">Phone</span>
            <a href="tel:0355410762">{PHONE}</a>
          </li>
          <li>
            <span className="lbl">Email</span>
            <a href={"mailto:" + EMAIL}>{EMAIL}</a>
          </li>
          <li>
            <span className="lbl">Facebook</span>
            <span>{FACEBOOK}</span>
          </li>
        </ul>
      </div>
    </section>
  );
}