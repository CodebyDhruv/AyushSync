import React, { useState, useEffect, useMemo, useRef } from "react";
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { Link } from "react-router-dom";


const CodeBlock = ({ children }) => {
	const [isCopied, setIsCopied] = useState(false);
	const textInput = useRef(null);

	const handleCopy = () => {
		if (textInput.current?.textContent) {
			const textArea = document.createElement("textarea");
			textArea.value = textInput.current.textContent;
			document.body.appendChild(textArea);
			textArea.select();
			try {
				document.execCommand('copy');
				setIsCopied(true);
				setTimeout(() => setIsCopied(false), 2000); 
			} catch (err) {
				console.error('Failed to copy text: ', err);
			}
			document.body.removeChild(textArea);
		}
	};

	return (
		<div className="bg-gray-800 text-white rounded-lg my-4 relative group">
			<button
				onClick={handleCopy}
				className="absolute top-2 right-2 p-1.5 bg-gray-900 hover:bg-gray-700 rounded-md transition-opacity opacity-0 group-hover:opacity-100"
				aria-label="Copy code"
			>
				{isCopied ? (
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-lg text-green-400" viewBox="0 0 16 16">
						<path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
					</svg>
				) : (
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clipboard" viewBox="0 0 16 16">
						<path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z" />
						<path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z" />
					</svg>
				)}
			</button>
			<pre className="p-4 pr-12 overflow-x-auto text-sm font-mono">
				<code ref={textInput}>{children}</code>
			</pre>
		</div>
	);
};

const InlineCode = ({ children }) => (
	<code className="bg-green-100 text-green-800 px-1.5 py-1 rounded-md font-mono text-sm">
		{children}
	</code>
);

const SectionHeading = ({ children, id }) => (
	<h2 id={id} className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200 scroll-mt-24">
		{children}
	</h2>
);

const SubHeading = ({ children, id }) => (
	<h3 id={id} className="text-2xl font-semibold text-gray-800 mt-10 mb-4 scroll-mt-24">
		{children}
	</h3>
);

const sections = [
	{
		id: 'introduction',
		title: 'Introduction',
		category: 'Getting Started',
		subheadings: [
			{ id: 'introduction-why', title: 'Why AyushSync?' },
			{ id: 'introduction-workflow', title: 'System Workflow' },
		],
		content: (
			<>
				<p className="text-lg text-gray-700 mb-4">
					<strong>AyushSync</strong> is a lightweight, FHIR R4–compliant terminology micro-service for India’s AYUSH and WHO ICD-11 (TM2 & Biomedicine) clinical vocabularies. It enables Electronic Medical Record (EMR) systems to integrate, search, and map traditional medicine diagnoses (Ayurveda, Siddha, Unani) using NAMASTE codes, and automatically link them with global ICD-11 codes for true dual-coding, analytics, and interoperability.
				</p>
				<SubHeading id="introduction-why">Why AyushSync?</SubHeading>
				<ul className="list-disc pl-6 space-y-2 text-gray-700">
					<li>Bridges AYUSH (India’s traditional medicine) and global digital health ecosystems.</li>
					<li>Enables India's healthcare providers and EMRs to code, analyze, and claim insurance for traditional as well as biomedical conditions—using a single, standards-based service.</li>
					<li>Powers analytics, research, and reporting for Ministry of Ayush, insurance, and public health.</li>
				</ul>
				<SubHeading id="introduction-workflow">System Workflow</SubHeading>
				<ol className="list-decimal pl-6 space-y-3 text-gray-700">
					<li><strong>Code Ingestion:</strong> Parse the NAMASTE CSV and ingest the AYUSH code system. Fetch ICD-11 TM2 and Biomedicine codes via the WHO API and synchronize the mappings.</li>
					<li><strong>Auto-complete and Translation:</strong> Use the REST API endpoints to search, look up, and translate between AYUSH (NAMASTE) and ICD-11 codes.</li>
					<li><strong>FHIR Bundle Upload:</strong> Securely upload dual-coded clinical encounters for record-keeping and analytics, following EHR 2016 standards.</li>
					<li><strong>Web/CLI Demo Interface:</strong> Test and demonstrate code search, mapping, and ProblemList entry creation.</li>
				</ol>
			</>
		),
	},
	{
		id: 'features',
		title: 'Features',
		category: 'Getting Started',
		subheadings: [], // This section has no subheadings
		content: (
			<>
				<p className="mb-4 text-gray-700">A summary of the core features offered by AyushSync.</p>
				<ul className="list-disc pl-6 space-y-2 text-gray-700">
					<li>FHIR R4 compliant resources for NAMASTE, ICD-11 TM2 & Biomedicine codes.</li>
					<li>Auto-complete REST endpoints for searching AYUSH and ICD-11 codes.</li>
					<li>Bidirectional mapping between NAMASTE and ICD-11 (TM2) codes.</li>
					<li>FHIR Bundle upload endpoint for dual-coded encounters.</li>
					<li>OAuth 2.0 and ABHA ID authentication for secure API access.</li>
					<li>Audit-ready metadata for consent and version tracking.</li>
					<li>Web/CLI demo interface for term lookup, mapping, and FHIR ProblemList generation.</li>
				</ul>
			</>
		)
	},
	{
		id: 'authentication',
		title: 'Authentication',
		category: 'API Reference',
		subheadings: [
			{ id: 'auth-otp-reg', title: '1. Request OTP for Registration' },
			{ id: 'auth-register', title: '2. Register User' },
			{ id: 'auth-otp-login', title: '3. Request OTP for Login' },
			{ id: 'auth-get-token', title: '4. Login and Get Token' },
			{ id: 'auth-get-user', title: '5. Get Current User' },
		],
		content: (
			<>
				<p className="text-gray-700 mb-4">
					This document provides instructions and examples for interacting with the AyushAuth API, which handles user registration and authentication using ABHA ID.
				</p>
				<p className="text-gray-700 font-medium">Base URL: <InlineCode>https://ayush-auth.vercel.app</InlineCode></p>

				<SubHeading id="auth-otp-reg">1. Request OTP for Registration</SubHeading>
				<p className="mb-2">Initiates the registration process by sending an OTP to the provided phone number.</p>
				<p><span className="font-semibold">Path:</span> <InlineCode>/request-otp</InlineCode></p>
				<p><span className="font-semibold">Method:</span> <InlineCode>POST</InlineCode></p>
				<p className="font-semibold mt-2">Request Body Example:</p>
				<CodeBlock>{`{
  "name": "John Doe",
  "phone_number": "9876543210",
  "abha_id": "john.doe@abha",
  "email": "john.doe@example.com"
}`}</CodeBlock>

				<SubHeading id="auth-register">2. Register User</SubHeading>
				<p className="mb-2">Completes user registration using the ABHA ID and the received OTP.</p>
				<p><span className="font-semibold">Path:</span> <InlineCode>/register</InlineCode></p>
				<p><span className="font-semibold">Method:</span> <InlineCode>POST</InlineCode></p>
				<p className="font-semibold mt-2">Example URL:</p>
				<CodeBlock>https://ayush-auth.vercel.app/register?abha_id=john.doe@abha&otp=123456</CodeBlock>

				<SubHeading id="auth-otp-login">3. Request OTP for Login</SubHeading>
				<p className="mb-2">Initiates the login process by sending an OTP to the phone number associated with the ABHA ID.</p>
				<p><span className="font-semibold">Path:</span> <InlineCode>/request-login-otp</InlineCode></p>
				<p><span className="font-semibold">Method:</span> <InlineCode>POST</InlineCode></p>
				<p className="font-semibold mt-2">Example URL:</p>
				<CodeBlock>https://ayush-auth.vercel.app/request-login-otp?abha_id=john.doe@abha</CodeBlock>

				<SubHeading id="auth-get-token">4. Login and Get Access Token</SubHeading>
				<p className="mb-2">Authenticates the user with ABHA ID and OTP, returning a JWT access token.</p>
				<p><span className="font-semibold">Path:</span> <InlineCode>/token</InlineCode></p>
				<p><span className="font-semibold">Method:</span> <InlineCode>POST</InlineCode></p>
				<p className="font-semibold mt-2">Example URL:</p>
				<CodeBlock>https://ayush-auth.vercel.app/token?abha_id=john.doe@abha&otp=654321</CodeBlock>
				<p className="font-semibold mt-2">Example Response (Success):</p>
				<CodeBlock>{`{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}`}</CodeBlock>

				<SubHeading id="auth-get-user">5. Get Current User Information (Protected)</SubHeading>
				<p className="mb-2">Retrieves information about the currently authenticated user.</p>
				<p><span className="font-semibold">Path:</span> <InlineCode>/users/me</InlineCode></p>
				<p><span className="font-semibold">Method:</span> <InlineCode>GET</InlineCode></p>
				<p className="font-semibold mt-2">Example cURL Command:</p>
				<CodeBlock>{`curl -X GET "https://ayush-auth.vercel.app/users/me" \\
  -H "Authorization: Bearer <access_token>"`}
				</CodeBlock>
			</>
		)
	},
	{
		id: 'codesystem',
		title: 'Code System',
		category: 'API Reference',
		subheadings: [
			
		],
		content: (
			<>
			</>
		)
	},
	{
		id: 'mapping',
		title: 'Mapping',
		category: 'API Reference',
		subheadings: [
		],
		content: (
			<>
			</>
		)
	},
	{
		id: 'compliance',
		title: 'Compliance',
		category: 'Resources',
		subheadings: [
			{ id: 'compliance-getting-started', title: 'Getting Started' },
			{ id: 'compliance-contributors', title: 'Contributors' },
		],
		content: (
			<>
				<p className="text-gray-700 mb-4">
					AyushSync is designed to adhere to key healthcare standards to ensure security, interoperability, and regulatory compliance.
				</p>
				<ul className="list-disc pl-6 space-y-2 text-gray-700">
					<li>Meets India’s 2016 EHR standards (FHIR R4, ISO 22600, SNOMED CT, LOINC).</li>
					<li>Consent and version tracking are embedded within all core data operations.</li>
				</ul>
				<SubHeading id="compliance-getting-started">Getting Started</SubHeading>
				<ul className="list-disc pl-6 space-y-2 text-gray-700">
					<li>Clone the repository</li>
					<li>Install dependencies (Python/Node/Java, depending on your backend framework)</li>
					<li>Configure OAuth 2.0 and ABHA endpoints</li>
					<li>Run the migration to ingest NAMASTE and ICD-11 code data</li>
					<li>Start the API service</li>
					<li>Access API docs and sample CLI/Web interface for demo</li>
				</ul>
				<SubHeading id="compliance-contributors">Contributors & Acknowledgements</SubHeading>
				<ul className="list-disc pl-6 space-y-2 text-gray-700">
					<li>Ministry of Ayush, Government of India</li>
					<li>Open-source digital health community</li>
					<li>NAMASTE Portal, Ministry of AYUSH</li>
					<li>WHO ICD-11 API</li>
				</ul>
			</>
		)
	}
];

const Apidocs = () => {
	const [activeSection, setActiveSection] = useState(sections[0].id);
	const [activeSubheading, setActiveSubheading] = useState('');
	const mainContentRef = useRef(null);

	const currentSection = useMemo(() => sections.find(sec => sec.id === activeSection), [activeSection]);

	const categories = useMemo(() => {
		return sections.reduce((acc, section) => {
			(acc[section.category] = acc[section.category] || []).push(section);
			return acc;
		}, {});
	}, []);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActiveSubheading(entry.target.id);
					}
				});
			},
			{
				rootMargin: '-80px 0px -50% 0px',
				threshold: 0
			}
		);

		const headings = mainContentRef.current?.querySelectorAll('h2[id], h3[id]');
		headings?.forEach(heading => observer.observe(heading));

		return () => observer.disconnect();
	}, [activeSection]);

	const handleSectionClick = (sectionId) => {
		setActiveSection(sectionId);
		setActiveSubheading(sections.find(s => s.id === sectionId)?.subheadings[0]?.id || '');
		window.scrollTo(0, 0); // Scroll page to top
	};

	const handleSubheadingClick = (subheadingId) => {
		document.getElementById(subheadingId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	};

	return (
		<>
			<Navbar />
			<div className="bg-white mt-15 pt-16">
				<div className="flex flex-col lg:flex-row max-w-7xl mx-auto">
					{/* Left Sidebar - Main Navigation */}
					<aside className="lg:w-72 bg-white sticky top-16 self-start p-6 h-[calc(100vh-4rem)] overflow-y-auto">
						<nav>
							{Object.entries(categories).map(([category, sectionsInCategory]) => (
								<div key={category} className="mb-8">
									<h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">{category}</h2>
									<ul className="space-y-2">
										{sectionsInCategory.map((sec) => (
											<li key={sec.id}>
												<button
													onClick={() => handleSectionClick(sec.id)}
													className={`w-full text-left px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${activeSection === sec.id
														? 'bg-green-100 text-green-700'
														: 'text-gray-700 hover:bg-gray-50'
														}`}
												>
													{sec.title}
												</button>
											</li>
										))}
									</ul>
								</div>
							))}
						</nav>
					</aside>

					{/* Main Content */}
					<main ref={mainContentRef} className="flex-1 px-8 py-12 min-w-0">
						<SectionHeading id={currentSection.id}>{currentSection.title}</SectionHeading>
						{currentSection.content}
					</main>

					{/* Right Sidebar - On This Page */}
					<aside className="hidden lg:block lg:w-72 bg-white sticky top-16 self-start p-6 h-[calc(100vh-4rem)] overflow-y-auto">
						{currentSection.subheadings.length > 0 && (
							<div>
								<h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-6">On This Page</h3>
								<nav>
									<ul className="space-y-3">
										{currentSection.subheadings.map((sub) => (
											<li key={sub.id}>
												<button
													onClick={() => handleSubheadingClick(sub.id)}
													className={`text-sm flex items-center transition-all duration-200 hover:translate-x-1 w-full text-left ${activeSubheading === sub.id
														? 'text-green-600 font-medium'
														: 'text-gray-600 hover:text-gray-900'
														}`}
												>
													<div className={`w-1.5 h-1.5 rounded-full mr-3 transition-all duration-200 ${activeSubheading === sub.id ? 'bg-green-500 scale-125' : 'bg-gray-300'}`}></div>
													{sub.title}
												</button>
											</li>
										))}
									</ul>
								</nav>
							</div>
						)}
						<div className="mt-10 p-4 bg-green-50 rounded-lg border border-green-200">
							<h4 className="font-semibold text-green-800 mb-2 flex items-center">
								<span className="mr-2 text-lg">💡</span> Need Help?
							</h4>
							<p className="text-sm text-green-700 mb-3">Questions about AyushSync?</p>
							<Link to="/contact">
							<button className="text-sm bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors w-full">
								Contact Support
							</button>
							</Link>
						</div>
					</aside>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default Apidocs;

