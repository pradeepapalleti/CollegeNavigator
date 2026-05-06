"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../config/database"));
const colleges = [
    { name: 'Indian Institute of Technology Bombay', location: 'Powai, Mumbai', city: 'Mumbai', state: 'Maharashtra', type: 'Public', established: 1958, rating: 4.8, fees_min: 200000, fees_max: 250000, description: 'Premier engineering institute known for cutting-edge research and world-class faculty.', campus_size: '550 acres', website: 'https://www.iitb.ac.in', placement_rate: 95.0, avg_package: 2100000, highest_package: 30000000 },
    { name: 'Indian Institute of Technology Delhi', location: 'Hauz Khas, New Delhi', city: 'New Delhi', state: 'Delhi', type: 'Public', established: 1961, rating: 4.7, fees_min: 200000, fees_max: 250000, description: 'One of India\'s top engineering institutions with strong industry connections.', campus_size: '325 acres', website: 'https://www.iitd.ac.in', placement_rate: 93.0, avg_package: 2000000, highest_package: 28000000 },
    { name: 'Indian Institute of Technology Madras', location: 'Adyar, Chennai', city: 'Chennai', state: 'Tamil Nadu', type: 'Public', established: 1959, rating: 4.8, fees_min: 200000, fees_max: 250000, description: 'Top-ranked IIT known for research excellence and beautiful campus inside a forest reserve.', campus_size: '617 acres', website: 'https://www.iitm.ac.in', placement_rate: 96.0, avg_package: 2150000, highest_package: 31000000 },
    { name: 'Indian Institute of Technology Kanpur', location: 'Kalyanpur, Kanpur', city: 'Kanpur', state: 'Uttar Pradesh', type: 'Public', established: 1959, rating: 4.6, fees_min: 200000, fees_max: 250000, description: 'Pioneer in computer science education in India with a strong entrepreneurial culture.', campus_size: '1055 acres', website: 'https://www.iitk.ac.in', placement_rate: 90.0, avg_package: 1900000, highest_package: 25000000 },
    { name: 'Indian Institute of Technology Kharagpur', location: 'Kharagpur', city: 'Kharagpur', state: 'West Bengal', type: 'Public', established: 1951, rating: 4.5, fees_min: 200000, fees_max: 250000, description: 'The first IIT established in India, offering the widest range of courses among all IITs.', campus_size: '2100 acres', website: 'https://www.iitkgp.ac.in', placement_rate: 89.0, avg_package: 1800000, highest_package: 24000000 },
    { name: 'Birla Institute of Technology and Science Pilani', location: 'Vidya Vihar, Pilani', city: 'Pilani', state: 'Rajasthan', type: 'Private', established: 1964, rating: 4.5, fees_min: 400000, fees_max: 550000, description: 'Premier private university known for flexible academic structure and strong alumni network.', campus_size: '328 acres', website: 'https://www.bits-pilani.ac.in', placement_rate: 88.0, avg_package: 1600000, highest_package: 20000000 },
    { name: 'National Institute of Technology Trichy', location: 'Tiruchirappalli', city: 'Tiruchirappalli', state: 'Tamil Nadu', type: 'Public', established: 1964, rating: 4.3, fees_min: 150000, fees_max: 200000, description: 'One of the top NITs in India with excellent placement records.', campus_size: '800 acres', website: 'https://www.nitt.edu', placement_rate: 85.0, avg_package: 1200000, highest_package: 18000000 },
    { name: 'Vellore Institute of Technology', location: 'Katpadi, Vellore', city: 'Vellore', state: 'Tamil Nadu', type: 'Private', established: 1984, rating: 4.2, fees_min: 300000, fees_max: 500000, description: 'Leading private university known for its vibrant campus life and global collaborations.', campus_size: '372 acres', website: 'https://www.vit.ac.in', placement_rate: 82.0, avg_package: 900000, highest_package: 14000000 },
    { name: 'Delhi University', location: 'North Campus, Delhi', city: 'New Delhi', state: 'Delhi', type: 'Public', established: 1922, rating: 4.3, fees_min: 50000, fees_max: 150000, description: 'India\'s premier central university with a rich heritage and diverse academic programs.', campus_size: '680 acres', website: 'https://www.du.ac.in', placement_rate: 75.0, avg_package: 800000, highest_package: 12000000 },
    { name: 'Manipal Institute of Technology', location: 'Manipal', city: 'Manipal', state: 'Karnataka', type: 'Private', established: 1957, rating: 4.1, fees_min: 350000, fees_max: 500000, description: 'One of India\'s oldest and most reputed private engineering colleges.', campus_size: '600 acres', website: 'https://www.manipal.edu', placement_rate: 80.0, avg_package: 850000, highest_package: 12000000 },
    { name: 'Indian Institute of Science Bangalore', location: 'Malleswaram, Bangalore', city: 'Bangalore', state: 'Karnataka', type: 'Public', established: 1909, rating: 4.9, fees_min: 100000, fees_max: 200000, description: 'India\'s premier research institution, consistently ranked #1 for research output.', campus_size: '400 acres', website: 'https://www.iisc.ac.in', placement_rate: 92.0, avg_package: 2200000, highest_package: 32000000 },
    { name: 'SRM Institute of Science and Technology', location: 'Kattankulathur, Chennai', city: 'Chennai', state: 'Tamil Nadu', type: 'Private', established: 1985, rating: 3.9, fees_min: 250000, fees_max: 450000, description: 'One of India\'s top-ranked private universities with a global outlook.', campus_size: '250 acres', website: 'https://www.srmist.edu.in', placement_rate: 78.0, avg_package: 700000, highest_package: 10000000 },
    { name: 'Jadavpur University', location: 'Jadavpur, Kolkata', city: 'Kolkata', state: 'West Bengal', type: 'Public', established: 1955, rating: 4.3, fees_min: 30000, fees_max: 80000, description: 'Prestigious state university known for engineering and research excellence.', campus_size: '57 acres', website: 'https://www.jaduniv.edu.in', placement_rate: 82.0, avg_package: 1000000, highest_package: 16000000 },
    { name: 'Amity University Noida', location: 'Sector 125, Noida', city: 'Noida', state: 'Uttar Pradesh', type: 'Private', established: 2005, rating: 3.7, fees_min: 300000, fees_max: 600000, description: 'Largest private university with modern infrastructure and international tie-ups.', campus_size: '1000 acres', website: 'https://www.amity.edu', placement_rate: 70.0, avg_package: 600000, highest_package: 8000000 },
    { name: 'National Institute of Technology Warangal', location: 'Warangal', city: 'Warangal', state: 'Telangana', type: 'Public', established: 1959, rating: 4.2, fees_min: 140000, fees_max: 190000, description: 'One of the first NITs established in India with strong engineering programs.', campus_size: '248 acres', website: 'https://www.nitw.ac.in', placement_rate: 84.0, avg_package: 1100000, highest_package: 15000000 },
    { name: 'Christ University Bangalore', location: 'Hosur Road, Bangalore', city: 'Bangalore', state: 'Karnataka', type: 'Private', established: 1969, rating: 4.0, fees_min: 200000, fees_max: 400000, description: 'Premier private university known for discipline, academics, and holistic development.', campus_size: '45 acres', website: 'https://www.christuniversity.in', placement_rate: 76.0, avg_package: 700000, highest_package: 9000000 },
    { name: 'Thapar Institute of Engineering', location: 'Bhadson Road, Patiala', city: 'Patiala', state: 'Punjab', type: 'Private', established: 1956, rating: 4.1, fees_min: 300000, fees_max: 450000, description: 'Reputed deemed university offering quality technical education in North India.', campus_size: '250 acres', website: 'https://www.thapar.edu', placement_rate: 83.0, avg_package: 950000, highest_package: 13000000 },
    { name: 'PSG College of Technology', location: 'Peelamedu, Coimbatore', city: 'Coimbatore', state: 'Tamil Nadu', type: 'Private', established: 1951, rating: 4.2, fees_min: 100000, fees_max: 250000, description: 'Top autonomous engineering college in Tamil Nadu with excellent industry connections.', campus_size: '45 acres', website: 'https://www.psgtech.edu', placement_rate: 86.0, avg_package: 800000, highest_package: 12000000 },
    { name: 'Symbiosis International University', location: 'Lavale, Pune', city: 'Pune', state: 'Maharashtra', type: 'Private', established: 2002, rating: 4.0, fees_min: 350000, fees_max: 600000, description: 'Multi-disciplinary university promoting international understanding through education.', campus_size: '300 acres', website: 'https://www.siu.edu.in', placement_rate: 79.0, avg_package: 850000, highest_package: 11000000 },
    { name: 'College of Engineering Pune', location: 'Shivajinagar, Pune', city: 'Pune', state: 'Maharashtra', type: 'Public', established: 1854, rating: 4.2, fees_min: 80000, fees_max: 150000, description: 'One of the oldest engineering colleges in Asia with a storied heritage.', campus_size: '133 acres', website: 'https://www.coep.org.in', placement_rate: 85.0, avg_package: 1050000, highest_package: 14000000 },
    { name: 'Anna University', location: 'Guindy, Chennai', city: 'Chennai', state: 'Tamil Nadu', type: 'Public', established: 1978, rating: 4.1, fees_min: 60000, fees_max: 120000, description: 'Top technical university in Tamil Nadu affiliating hundreds of engineering colleges.', campus_size: '192 acres', website: 'https://www.annauniv.edu', placement_rate: 80.0, avg_package: 750000, highest_package: 11000000 },
    { name: 'Lovely Professional University', location: 'Phagwara', city: 'Phagwara', state: 'Punjab', type: 'Private', established: 2005, rating: 3.6, fees_min: 200000, fees_max: 400000, description: 'One of India\'s largest single-campus universities offering 200+ programs.', campus_size: '600 acres', website: 'https://www.lpu.in', placement_rate: 68.0, avg_package: 550000, highest_package: 7000000 },
    { name: 'IIIT Hyderabad', location: 'Gachibowli, Hyderabad', city: 'Hyderabad', state: 'Telangana', type: 'Public', established: 1998, rating: 4.5, fees_min: 200000, fees_max: 350000, description: 'Top-tier institute focused on IT and related fields with strong research output.', campus_size: '66 acres', website: 'https://www.iiit.ac.in', placement_rate: 92.0, avg_package: 1800000, highest_package: 25000000 },
    { name: 'PES University', location: 'Banashankari, Bangalore', city: 'Bangalore', state: 'Karnataka', type: 'Private', established: 1972, rating: 4.0, fees_min: 300000, fees_max: 500000, description: 'Bangalore\'s top private engineering university with focus on innovation.', campus_size: '38 acres', website: 'https://www.pes.edu', placement_rate: 80.0, avg_package: 900000, highest_package: 13000000 },
    { name: 'RV College of Engineering', location: 'Mysore Road, Bangalore', city: 'Bangalore', state: 'Karnataka', type: 'Private', established: 1963, rating: 4.1, fees_min: 200000, fees_max: 400000, description: 'One of the most reputed engineering colleges in Bangalore.', campus_size: '52 acres', website: 'https://www.rvce.edu.in', placement_rate: 84.0, avg_package: 1000000, highest_package: 14000000 },
];
const coursesByType = {
    engineering: [
        { name: 'Computer Science & Engineering', duration: '4 years', fees: 0, degree_type: 'B.Tech', description: 'Study of algorithms, data structures, AI, and software systems.' },
        { name: 'Electrical Engineering', duration: '4 years', fees: 0, degree_type: 'B.Tech', description: 'Covers power systems, electronics, and electrical machines.' },
        { name: 'Mechanical Engineering', duration: '4 years', fees: 0, degree_type: 'B.Tech', description: 'Study of design, manufacturing, and thermal systems.' },
        { name: 'Civil Engineering', duration: '4 years', fees: 0, degree_type: 'B.Tech', description: 'Covers structural, environmental, and transportation engineering.' },
        { name: 'Electronics & Communication', duration: '4 years', fees: 0, degree_type: 'B.Tech', description: 'Study of electronic devices, circuits, and communication systems.' },
        { name: 'Data Science & AI', duration: '4 years', fees: 0, degree_type: 'B.Tech', description: 'Modern program focusing on machine learning and data analytics.' },
    ],
    pg: [
        { name: 'M.Tech Computer Science', duration: '2 years', fees: 0, degree_type: 'M.Tech', description: 'Advanced study in computer science and research.' },
        { name: 'MBA', duration: '2 years', fees: 0, degree_type: 'MBA', description: 'Master of Business Administration program.' },
        { name: 'M.Sc Data Science', duration: '2 years', fees: 0, degree_type: 'M.Sc', description: 'Specialized masters in data science and analytics.' },
    ],
};
const topRecruiters = [
    ['Google', 'Microsoft', 'Amazon', 'Apple', 'Meta'],
    ['Goldman Sachs', 'JP Morgan', 'Morgan Stanley', 'Deutsche Bank'],
    ['TCS', 'Infosys', 'Wipro', 'HCL', 'Tech Mahindra'],
    ['Flipkart', 'Swiggy', 'Zomato', 'PhonePe', 'Razorpay'],
    ['Deloitte', 'EY', 'PwC', 'KPMG', 'McKinsey'],
];
const reviewTemplates = [
    { title: 'Great experience overall', pros: 'Excellent faculty, good campus', cons: 'Hostel food could be better' },
    { title: 'Worth every penny', pros: 'Amazing placements, vibrant culture', cons: 'Can be stressful during exams' },
    { title: 'Solid education', pros: 'Strong academics, good labs', cons: 'More industry exposure needed' },
    { title: 'Life-changing experience', pros: 'Diverse community, world-class research', cons: 'Location could be more urban' },
];
const names = ['Arjun Sharma', 'Priya Patel', 'Rahul Verma', 'Sneha Iyer', 'Amit Kumar', 'Divya Reddy', 'Rohan Singh', 'Kavya Nair'];
const seedDatabase = async () => {
    const client = await database_1.default.connect();
    try {
        await client.query('BEGIN');
        // Clear existing data
        await client.query('DELETE FROM saved_comparisons');
        await client.query('DELETE FROM saved_colleges');
        await client.query('DELETE FROM reviews');
        await client.query('DELETE FROM placements');
        await client.query('DELETE FROM courses');
        await client.query('DELETE FROM colleges');
        for (const college of colleges) {
            const result = await client.query(`INSERT INTO colleges (name, location, city, state, type, established, rating, fees_min, fees_max, description, campus_size, website, placement_rate, avg_package, highest_package)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15) RETURNING id`, [college.name, college.location, college.city, college.state, college.type, college.established, college.rating, college.fees_min, college.fees_max, college.description, college.campus_size, college.website, college.placement_rate, college.avg_package, college.highest_package]);
            const collegeId = result.rows[0].id;
            // Add courses
            const allCourses = [...coursesByType.engineering, ...coursesByType.pg];
            const numCourses = 4 + Math.floor(Math.random() * 5);
            const selectedCourses = allCourses.sort(() => Math.random() - 0.5).slice(0, numCourses);
            for (const course of selectedCourses) {
                const fees = college.fees_min + Math.floor(Math.random() * (college.fees_max - college.fees_min));
                await client.query(`INSERT INTO courses (college_id, name, duration, fees, degree_type, description) VALUES ($1,$2,$3,$4,$5,$6)`, [collegeId, course.name, course.duration, fees, course.degree_type, course.description]);
            }
            // Add placements for 3 years
            for (let year = 2022; year <= 2024; year++) {
                const variation = (Math.random() - 0.5) * 6;
                const recruiterSet = topRecruiters[Math.floor(Math.random() * topRecruiters.length)];
                await client.query(`INSERT INTO placements (college_id, year, placement_rate, avg_package, highest_package, students_placed, total_students, top_recruiters)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`, [collegeId, year, Math.min(100, (college.placement_rate || 70) + variation), (college.avg_package || 500000) * (0.9 + Math.random() * 0.2), (college.highest_package || 2000000) * (0.9 + Math.random() * 0.2), Math.floor(200 + Math.random() * 300), Math.floor(300 + Math.random() * 200), recruiterSet]);
            }
            // Add reviews
            const numReviews = 2 + Math.floor(Math.random() * 3);
            for (let i = 0; i < numReviews; i++) {
                const template = reviewTemplates[Math.floor(Math.random() * reviewTemplates.length)];
                const author = names[Math.floor(Math.random() * names.length)];
                const rating = Math.max(1, Math.min(5, (college.rating || 3) + (Math.random() - 0.5) * 2));
                await client.query(`INSERT INTO reviews (college_id, author, rating, title, comment, pros, cons) VALUES ($1,$2,$3,$4,$5,$6,$7)`, [collegeId, author, Math.round(rating * 10) / 10, template.title, `${template.title}. ${college.name} has been a wonderful institution for my education.`, template.pros, template.cons]);
            }
        }
        await client.query('COMMIT');
        console.log(`✅ Seeded ${colleges.length} colleges with courses, placements, and reviews`);
    }
    catch (error) {
        await client.query('ROLLBACK');
        console.error('❌ Error seeding:', error);
        throw error;
    }
    finally {
        client.release();
    }
};
exports.default = seedDatabase;
//# sourceMappingURL=seed.js.map