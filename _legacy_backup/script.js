// Init Animations
AOS.init({ duration: 1000, once: true, offset: 100, mirror: true });

// Language Translations
const translations = {
    id: {
        // Navigation
        nav: {
            home: "Home",
            firm: "Our Firm", 
            founder: "Founder",
            lawyers: "Our Lawyers",
            associates: "Associates",
            services: "Services",
            clients: "Clients",
            contact: "Contact"
        },
        // Hero Section
        hero: {
            title: "Kantor Hukum Profesional",
            subtitle: "Tao Manullang & Partners",
            description: "Kantor hukum terkemuka di Indonesia dengan pengalaman lebih dari 15 tahun dalam berbagai bidang hukum bisnis dan litigasi.",
            cta: "Konsultasi Gratis"
        },
        // About Section
        about: {
            title: "Tentang Kami",
            subtitle: "Dedikasi untuk Keadilan",
            description: "Tao Manullang & Partners adalah firma hukum terkemuka yang berkomitmen untuk memberikan layanan hukum berkualitas tinggi dengan integritas dan profesionalisme.",
            achievements: [
                "Sidang Semu MPR & Constitutional Drafting Padjadjaran Law Fair 2015",
                "Kompetisi Debat UNPAR 2014", 
                "UI Business Law Comp 2016",
                "World MUN Udayana 2017"
            ]
        },
        // Founder Section
        founder: {
            title: "Pendiri Kami",
            name: "Tao Manullang, S.H., M.H.",
            position: "Managing Partner",
            bio: "Tao Manullang adalah pendiri dan managing partner dari Tao Manullang & Partners. Dengan pengalaman lebih dari 20 tahun di dunia hukum, beliau telah menangani berbagai kasus kompleks dan memberikan nasihat hukum untuk perusahaan-perusahaan terkemuka di Indonesia.",
            education: "Pendidikan: Universitas Indonesia (S1), Harvard Law School (LL.M.)",
            experience: "Pengalaman: Partner di berbagai firma hukum internasional, Konsultan hukum untuk BUMN dan perusahaan swasta.",
            seeMore: "Lihat Selengkapnya",
            seeLess: "Lihat Lebih Sedikit"
        },
        // Lawyers Section
        lawyers: {
            title: "Pengacara Kami",
            subtitle: "Bertemu Pengacara Kami",
            ronaldo: {
                bio: "Pengacara berpengalaman di bidang hukum perusahaan dan litigasi, dengan fokus pada penyelesaian sengketa bisnis. Berbasis di Jakarta.",
                specialty: "Dipercaya sebagai konsultan hukum untuk beberapa perusahaan nasional, spesialisasi merger dan akuisisi."
            },
            raymond: {
                bio: "Spesialis hukum perdata dan kontrak, membantu klien dalam transaksi komersial dan litigasi sipil. Berbasis di Bandung.",
                specialty: "Ahli dalam penyusunan kontrak bisnis dan penyelesaian sengketa perdata."
            },
            ferdinan: {
                bio: "Ahli dalam hukum ketenagakerjaan dan hubungan industrial, memberikan konsultasi untuk perusahaan dan karyawan. Berbasis di Bandung.",
                specialty: "Fokus pada compliance ketenagakerjaan dan penyelesaian sengketa kerja."
            },
            aldiat: {
                bio: "Fokus pada hukum agraria dan properti, membantu dalam akuisisi lahan dan sengketa tanah. Berbasis di Kalimantan.",
                specialty: "Ahli dalam hukum tanah dan pertanahan, mendampingi proyek properti."
            },
            seeMore: "Lihat Selengkapnya"
        },
        // Associates Section
        associates: {
            title: "Associate Kami",
            subtitle: "Tim Profesional Kami"
        },
        // Services Section
        services: {
            title: "Layanan Kami",
            subtitle: "Solusi Hukum Komprehensif",
            items: [
                "Hukum Perusahaan & Bisnis",
                "Hukum Perdata & Kontrak", 
                "Hukum Ketenagakerjaan",
                "Hukum Agraria & Properti",
                "Hukum Penanaman Modal",
                "Litigasi & Arbitrase"
            ]
        },
        // Clients Section
        clients: {
            title: "Klien Kami",
            subtitle: "Mereka Mempercayai Kami"
        },
        // Contact Section
        contact: {
            title: "Kontak Kami",
            subtitle: "Menerima tamu kapan saja untuk konsultasi profesional.",
            address: "The Habibie Center, Lt 1, Jln. Kemang Selatan No. 98, Cilandak Timur, Jakarta Selatan, 12560.",
            phone: "0812-2188-1231",
            website: "www.tmplawyers.com",
            instagram: "@tmplawfirm",
            form: {
                name: "Full Name",
                email: "Email Address", 
                message: "How can we help you?",
                submit: "Submit Inquiry"
            },
            success: "Terima kasih atas inquiry Anda! Kami akan menghubungi Anda segera.",
            error: "Mohon lengkapi semua field."
        }
    },
    en: {
        // Navigation
        nav: {
            home: "Home",
            firm: "Our Firm",
            founder: "Founder", 
            lawyers: "Our Lawyers",
            associates: "Associates",
            services: "Services",
            clients: "Clients",
            contact: "Contact"
        },
        // Hero Section
        hero: {
            title: "Professional Law Firm",
            subtitle: "Tao Manullang & Partners",
            description: "Leading law firm in Indonesia with over 15 years of experience in various fields of business law and litigation.",
            cta: "Free Consultation"
        },
        // About Section
        about: {
            title: "About Us",
            subtitle: "Dedicated to Justice",
            description: "Tao Manullang & Partners is a leading law firm committed to providing high-quality legal services with integrity and professionalism.",
            achievements: [
                "MPR Mock Trial & Constitutional Drafting Padjadjaran Law Fair 2015",
                "UNPAR Debate Competition 2014",
                "UI Business Law Comp 2016", 
                "World MUN Udayana 2017"
            ]
        },
        // Founder Section
        founder: {
            title: "Our Founder",
            name: "Tao Manullang, S.H., M.H.",
            position: "Managing Partner",
            bio: "Tao Manullang is the founder and managing partner of Tao Manullang & Partners. With over 20 years of experience in the legal world, he has handled various complex cases and provided legal advice to leading companies in Indonesia.",
            education: "Education: University of Indonesia (Bachelor), Harvard Law School (LL.M.)",
            experience: "Experience: Partner at various international law firms, Legal consultant for SOEs and private companies.",
            seeMore: "See More",
            seeLess: "See Less"
        },
        // Lawyers Section
        lawyers: {
            title: "Our Lawyers",
            subtitle: "Meet Our Lawyers",
            ronaldo: {
                bio: "Experienced lawyer in corporate law and litigation, focusing on business dispute resolution. Based in Jakarta.",
                specialty: "Trusted as legal consultant for several national companies, specializing in mergers and acquisitions."
            },
            raymond: {
                bio: "Specialist in civil law and contracts, assisting clients in commercial transactions and civil litigation. Based in Bandung.",
                specialty: "Expert in drafting business contracts and civil dispute resolution."
            },
            ferdinan: {
                bio: "Expert in labor law and industrial relations, providing consultation for companies and employees. Based in Bandung.",
                specialty: "Focus on labor compliance and dispute resolution."
            },
            aldiat: {
                bio: "Focus on agrarian law and property, assisting in land acquisition and land disputes. Based in Kalimantan.",
                specialty: "Expert in land law and land affairs, accompanying property projects."
            },
            seeMore: "See More"
        },
        // Associates Section
        associates: {
            title: "Our Associates",
            subtitle: "Our Professional Team"
        },
        // Services Section
        services: {
            title: "Our Services",
            subtitle: "Comprehensive Legal Solutions",
            items: [
                "Corporate & Business Law",
                "Civil Law & Contracts",
                "Labor Law",
                "Agrarian & Property Law", 
                "Investment Law",
                "Litigation & Arbitration"
            ]
        },
        // Clients Section
        clients: {
            title: "Our Clients",
            subtitle: "They Trust Us"
        },
        // Contact Section
        contact: {
            title: "Contact Us",
            subtitle: "We welcome visitors anytime for professional consultation.",
            address: "The Habibie Center, 1st Floor, Jln. Kemang Selatan No. 98, Cilandak Timur, Jakarta Selatan, 12560.",
            phone: "0812-2188-1231",
            website: "www.tmplawyers.com",
            instagram: "@tmplawfirm",
            form: {
                name: "Full Name",
                email: "Email Address",
                message: "How can we help you?",
                submit: "Submit Inquiry"
            },
            success: "Thank you for your inquiry! We will contact you soon.",
            error: "Please fill in all fields."
        }
    }
};

// Current language
let currentLang = 'id';

// Language Functions
function setLanguage(lang) {
    currentLang = lang;
    updateLanguage();
    updateLangButtons();
}

function setEnglish() {
    setLanguage('en');
}

function setIndonesian() {
    setLanguage('id');
}

// Update Language Buttons
function updateLangButtons() {
    const buttons = [
        { en: 'langEN', id: 'langID' },
        { en: 'langENMobile', id: 'langIDMobile' }
    ];

    buttons.forEach(btnSet => {
        const enBtn = document.getElementById(btnSet.en);
        const idBtn = document.getElementById(btnSet.id);

        if (enBtn && idBtn) {
            // Ensure both buttons have gold text
            enBtn.classList.add('text-tmp-gold');
            idBtn.classList.add('text-tmp-gold');

            // Only toggle background on active button; do not change text color
            if (currentLang === 'en') {
                enBtn.classList.add('bg-tmp-gold');
                idBtn.classList.remove('bg-tmp-gold');
            } else {
                idBtn.classList.add('bg-tmp-gold');
                enBtn.classList.remove('bg-tmp-gold');
            }
        }
    });
}

// Update All Text Content
function updateLanguage() {
    const t = translations[currentLang];
    
    // Navigation
    document.querySelector('a[href="#home"]').textContent = t.nav.home;
    document.querySelector('a[href="#about"]').textContent = t.nav.firm;
    document.querySelector('a[href="#founder"]').textContent = t.nav.founder;
    document.querySelector('a[href="#lawyers"]').textContent = t.nav.lawyers;
    document.querySelector('a[href="#associates"]').textContent = t.nav.associates;
    document.querySelector('a[href="#services"]').textContent = t.nav.services;
    document.querySelector('a[href="#clients"]').textContent = t.nav.clients;
    document.querySelector('a[href="#contact"]').textContent = t.nav.contact;
    
    // Hero Section
    document.querySelector('.hero-title').textContent = t.hero.title;
    document.querySelector('.hero-description').textContent = t.hero.description;
    document.querySelector('.hero-cta').textContent = t.hero.cta;
    
    // About Section
    document.querySelector('#about h2').textContent = t.about.title;
    document.querySelector('#about h3').textContent = t.about.subtitle;
    document.querySelector('#about p').textContent = t.about.description;
    
    // Founder Section
    document.querySelector('#founder h2').textContent = t.founder.title;
    document.querySelector('#founder .founder-name').textContent = t.founder.name;
    document.querySelector('#founder .founder-position').textContent = t.founder.position;
    document.querySelector('#founder .founder-bio').textContent = t.founder.bio;
    document.querySelector('#founder .founder-education').textContent = t.founder.education;
    document.querySelector('#founder .founder-experience').textContent = t.founder.experience;
    
    // Lawyers Section
    document.querySelector('#lawyers h2').textContent = t.lawyers.title;
    document.querySelector('#lawyers h3').textContent = t.lawyers.subtitle;
    
    // Contact Section
    document.querySelector('#contact h2').textContent = t.contact.title;
    document.querySelector('#contact .contact-subtitle').textContent = t.contact.subtitle;
    document.querySelector('.contact-address').textContent = t.contact.address;
    document.querySelector('.contact-phone').textContent = t.contact.phone;
    document.querySelector('.contact-website').textContent = t.contact.website;
    document.querySelector('.contact-instagram').textContent = t.contact.instagram;
    
    // Form
    document.querySelector('input[type="text"]').placeholder = t.contact.form.name;
    document.querySelector('input[type="email"]').placeholder = t.contact.form.email;
    document.querySelector('textarea').placeholder = t.contact.form.message;
    document.querySelector('button[type="submit"]').textContent = t.contact.form.submit;
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', function() {
    updateLangButtons();
    
    // Desktop buttons
    const enBtn = document.getElementById('langEN');
    const idBtn = document.getElementById('langID');
    const enBtnMobile = document.getElementById('langENMobile');
    const idBtnMobile = document.getElementById('langIDMobile');
    
    if (enBtn) enBtn.addEventListener('click', setEnglish);
    if (idBtn) idBtn.addEventListener('click', setIndonesian);
    if (enBtnMobile) enBtnMobile.addEventListener('click', setEnglish);
    if (idBtnMobile) idBtnMobile.addEventListener('click', setIndonesian);
});

// Navbar Scroll Effect
const navbar = document.getElementById('mainNav');
window.onscroll = () => {
    if (window.scrollY > 80) {
        navbar.classList.add('nav-scrolled');
    } else {
        navbar.classList.remove('nav-scrolled');
    }
};

// Smooth Internal Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Toggle Founder Details
function toggleFounder() {
    const more = document.getElementById('more-founder');
    const short1 = document.getElementById('short-founder-1');
    const short2 = document.getElementById('short-founder-2');
    const btn = event.target;
    if (more.style.display === 'none') {
        more.style.display = 'block';
        short1.style.display = 'none';
        short2.style.display = 'none';
        btn.textContent = 'Lihat Lebih Sedikit';
    } else {
        more.style.display = 'none';
        short1.style.display = 'block';
        short2.style.display = 'block';
        btn.textContent = 'Lihat Selengkapnya';
    }
}

// Form Submit Handler
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.querySelector('input[type="text"]').value;
    const email = document.querySelector('input[type="email"]').value;
    const message = document.querySelector('textarea').value;
    
    if (name && email && message) {
        alert(translations[currentLang].contact.success);
        // Reset form
        this.reset();
    } else {
        alert(translations[currentLang].contact.error);
    }
});

// Lawyer Modal Functions
const lawyerData = {
    ronaldo: {
        name: "H Ronaldo Munthe",
        title: "Senior Partner",
        image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=300&h=400&fit=crop",
        bio: "H Ronaldo Munthe adalah pengacara senior dengan pengalaman lebih dari 15 tahun di bidang hukum perusahaan. Beliau spesialis dalam litigasi bisnis, merger dan akuisisi, serta penyelesaian sengketa korporasi. Ronaldo telah menangani berbagai kasus besar di Indonesia dan memiliki jaringan luas di komunitas bisnis.",
        education: [
            "Sarjana Hukum, Universitas Indonesia (2005)",
            "Magister Hukum Bisnis, Universitas Gadjah Mada (2008)",
            "Advokat Bersertifikat, PERADI (2009)"
        ],
        experience: [
            "Partner, Tao Manullang & Partners (2015-sekarang)",
            "Associate, Hadiputranto Hadinoto & Partners (2009-2015)",
            "Legal Counsel, PT Telekomunikasi Indonesia (2007-2009)"
        ],
        expertise: ["Hukum Perusahaan", "Litigasi Bisnis", "Merger & Akuisisi", "Hukum Kontrak"]
    },
    raymond: {
        name: "Raymond K Sitorus",
        title: "Partner",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=400&fit=crop",
        bio: "Raymond K Sitorus adalah ahli hukum perdata dengan fokus pada kontrak bisnis dan litigasi sipil. Dengan pengalaman 12 tahun, beliau telah membantu berbagai perusahaan dalam menyusun kontrak yang kuat dan menyelesaikan sengketa perdata dengan efisien.",
        education: [
            "Sarjana Hukum, Universitas Padjadjaran (2008)",
            "Magister Hukum, Universitas Indonesia (2011)",
            "Advokat Bersertifikat, PERADI (2012)"
        ],
        experience: [
            "Partner, Tao Manullang & Partners (2018-sekarang)",
            "Senior Associate, Lubis Ganie Surowidjojo (2012-2018)",
            "Legal Officer, PT Bank Mandiri (2010-2012)"
        ],
        expertise: ["Hukum Perdata", "Hukum Kontrak", "Litigasi Sipil", "Arbitrase"]
    },
    ferdinan: {
        name: "Ferdinan A Sipahutar",
        title: "Senior Associate",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=400&fit=crop",
        bio: "Ferdinan A Sipahutar merupakan spesialis hukum ketenagakerjaan dengan pengalaman dalam menangani hubungan industrial. Beliau memberikan konsultasi komprehensif untuk perusahaan dan karyawan dalam masalah ketenagakerjaan dan penyelesaian sengketa kerja.",
        education: [
            "Sarjana Hukum, Universitas Parahyangan (2010)",
            "Magister Hukum Ketenagakerjaan, Universitas Airlangga (2013)",
            "Advokat Bersertifikat, PERADI (2014)"
        ],
        experience: [
            "Senior Associate, Tao Manullang & Partners (2016-sekarang)",
            "Associate, Assegaf Hamzah & Partners (2014-2016)",
            "HR Legal Consultant, PT Unilever Indonesia (2012-2014)"
        ],
        expertise: ["Hukum Ketenagakerjaan", "Hubungan Industrial", "PHK & Outsourcing", "Perjanjian Kerja"]
    },
    aldiat: {
        name: "Aldiat Arief",
        title: "Associate",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=400&fit=crop",
        bio: "Aldiat Arief fokus pada hukum agraria dan properti dengan pengalaman dalam akuisisi lahan dan sengketa tanah. Beliau telah mendampingi berbagai proyek properti besar di Kalimantan dan membantu klien dalam urusan pertanahan.",
        education: [
            "Sarjana Hukum, Universitas Brawijaya (2012)",
            "Magister Hukum Agraria, Universitas Gadjah Mada (2015)",
            "Advokat Bersertifikat, PERADI (2016)"
        ],
        experience: [
            "Associate, Tao Manullang & Partners (2018-sekarang)",
            "Legal Officer, PT Adaro Energy (2016-2018)",
            "Property Legal Consultant, PT Lippo Karawaci (2014-2016)"
        ],
        expertise: ["Hukum Agraria", "Hukum Tanah", "Akuisisi Lahan", "Sengketa Properti"]
    }
};

function showLawyerModal(lawyerId) {
    const modal = document.getElementById('lawyerModal');
    const content = document.getElementById('lawyerModalContent');
    const lawyer = lawyerData[lawyerId];
    
    if (lawyer) {
        content.innerHTML = `
            <div class="text-center mb-6">
                <img src="${lawyer.image}" alt="${lawyer.name}" 
                     class="w-32 h-40 object-cover rounded mx-auto mb-4">
                <h2 class="text-2xl font-serif italic text-white mb-2">${lawyer.name}</h2>
                <p class="text-tmp-gold font-bold uppercase tracking-widest text-sm">${lawyer.title}</p>
            </div>
            
            <div class="space-y-6">
                <div>
                    <h3 class="text-tmp-gold font-bold uppercase tracking-widest text-sm mb-3">Biografi</h3>
                    <p class="text-gray-300 text-sm leading-relaxed">${lawyer.bio}</p>
                </div>
                
                <div>
                    <h3 class="text-tmp-gold font-bold uppercase tracking-widest text-sm mb-3">Pendidikan</h3>
                    <ul class="text-gray-300 text-sm space-y-1">
                        ${lawyer.education.map(edu => `<li>• ${edu}</li>`).join('')}
                    </ul>
                </div>
                
                <div>
                    <h3 class="text-tmp-gold font-bold uppercase tracking-widest text-sm mb-3">Pengalaman</h3>
                    <ul class="text-gray-300 text-sm space-y-1">
                        ${lawyer.experience.map(exp => `<li>• ${exp}</li>`).join('')}
                    </ul>
                </div>
                
                <div>
                    <h3 class="text-tmp-gold font-bold uppercase tracking-widest text-sm mb-3">Keahlian</h3>
                    <div class="flex flex-wrap gap-2">
                        ${lawyer.expertise.map(skill => 
                            `<span class="bg-tmp-gold/20 text-tmp-gold px-3 py-1 rounded text-xs font-bold uppercase tracking-widest">${skill}</span>`
                        ).join('')}
                    </div>
                </div>
            </div>
        `;
        
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closeLawyerModal() {
    const modal = document.getElementById('lawyerModal');
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
document.getElementById('lawyerModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeLawyerModal();
    }
});