const CORE = [
  ["Integrity", "Honesty, fairness and accountability in public service."],
  ["Commitment", "Responsibility toward the delivery of the Department’s mission and the attainment of its vision."],
  ["Responsiveness", "Prompt, attentive and dependable service to local governments and the public."],
  ["Teamwork", "Working together as one DILG, cooperating and coordinating toward shared goals."],
];
const SHARED = [["Matino", "Upright and honest"], ["Mahusay", "Excellent and effective"], ["Maaasahan", "Dependable and trusted"]];

export default function About() {
  return (
    <section className="page">
      <h1 className="title l">ABOUT</h1>

      <div className="box">
        <h2 className="h2">What is the DILG?</h2>
        <p>The Department of the Interior and Local Government (DILG) is the national government agency that assists the President in exercising general supervision over local governments. It was created under Republic Act No. 6975, the DILG Act of 1990.</p>
        <p><b>Mandate:</b> to promote peace and order, ensure public safety, and strengthen the capability of local government units (LGUs) to deliver basic services effectively to the citizenry.</p>
      </div>

      <div className="box">
        <h2 className="h2">About the LGRC</h2>
        <p>The Local Government Resource Center (LGRC) brings together guidelines, tools and learning materials from DILG programs in one place, organized under the Department’s five organizational outcomes, so that local government officials and partners can find and use them easily.</p>
      </div>

      <div className="two2">
        <div className="box"><h2 className="h2">Vision</h2>
          <p>A highly trusted Department and partner in nurturing local governments and sustaining peaceful, safe, progressive, resilient and inclusive communities, toward a comfortable and secure life for all Filipinos by 2040.</p></div>
        <div className="box"><h2 className="h2">Mission</h2>
          <p>The Department shall ensure peace and order, public safety and security, uphold excellence in local governance, and enable resilient and inclusive communities.</p></div>
      </div>

      <h2 className="h2 pad">Core Values</h2>
      <div className="vals">
        {CORE.map(([t, d]) => <div className="val" key={t}><b>{t}</b><p>{d}</p></div>)}
      </div>

      <h2 className="h2 pad">Shared Values</h2>
      <p className="mu">“Ang DILG ay Matino, Mahusay at Maaasahan.”</p>
      <div className="vals">
        {SHARED.map(([t, d]) => <div className="val" key={t}><b>{t}</b><p>{d}</p></div>)}
      </div>
    </section>
  );
}