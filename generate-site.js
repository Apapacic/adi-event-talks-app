const talksData = [
    {
        id: 'talk-1',
        title: 'The Future of AI in Software Engineering',
        speakers: ['Alice Johnson'],
        category: ['AI', 'Software Development', 'Innovation'],
        duration: 60,
        description: 'An insightful look into how AI is revolutionizing software development processes and tools, from automated code generation to intelligent debugging assistants.'
    },
    {
        id: 'talk-2',
        title: 'Mastering Modern JavaScript Frameworks',
        speakers: ['Bob Williams', 'Charlie Davis'],
        category: ['Frontend', 'JavaScript', 'Web Development'],
        duration: 60,
        description: 'Dive deep into the latest features and best practices for popular JavaScript frameworks like React, Vue, and Angular.'
    },
    {
        id: 'talk-3',
        title: 'DevOps: Automating Your Deployment Pipeline',
        speakers: ['Diana Miller'],
        category: ['DevOps', 'Cloud', 'Automation'],
        duration: 60,
        description: 'Learn how to build robust and efficient CI/CD pipelines to streamline your software delivery process.'
    },
    {
        id: 'talk-4',
        title: 'Cybersecurity Essentials for Developers',
        speakers: ['Eve White'],
        category: ['Security', 'Best Practices'],
        duration: 60,
        description: 'Understand common security vulnerabilities and how to write secure code from the ground up.'
    },
    {
        id: 'talk-5',
        title: 'Data Science with Python: Beyond the Basics',
        speakers: ['Frank Green', 'Grace Hall'],
        category: ['Data Science', 'Python', 'Machine Learning'],
        duration: 60,
        description: 'Explore advanced data analysis techniques, machine learning algorithms, and data visualization using Python.'
    },
    {
        id: 'talk-6',
        title: 'Building Scalable Microservices with Node.js',
        speakers: ['Henry Black'],
        category: ['Backend', 'Node.js', 'Microservices'],
        duration: 60,
        description: 'Discover patterns and strategies for designing and implementing scalable and resilient microservices architectures using Node.js.'
    }
];

function calculateSchedule(talks) {
    const schedule = [];
    let currentTime = new Date();
    currentTime.setHours(10, 0, 0, 0); // Start at 10:00 AM

    for (let i = 0; i < talks.length; i++) {
        const talk = talks[i];
        const startTime = new Date(currentTime);
        const endTime = new Date(currentTime.getTime() + talk.duration * 60 * 1000);

        schedule.push({
            ...talk,
            startTime: startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            endTime: endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });

        currentTime = new Date(endTime.getTime() + 10 * 60 * 1000); // Add 10 mins transition

        // Insert lunch break after the third talk
        if (i === 2) {
            const lunchStartTime = new Date(currentTime);
            const lunchEndTime = new Date(currentTime.getTime() + 60 * 60 * 1000); // 1 hour lunch

            schedule.push({
                id: 'lunch',
                title: 'Lunch Break',
                speakers: [],
                category: [],
                duration: 60,
                description: 'Time to refuel and network!',
                startTime: lunchStartTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                endTime: lunchEndTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            });
            currentTime = new Date(lunchEndTime);
        }
    }
    return schedule;
}

const fullSchedule = calculateSchedule(talksData);

const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tech Event Schedule</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f4f7f6;
            color: #333;
            line-height: 1.6;
        }
        .container {
            max-width: 900px;
            margin: 20px auto;
            background-color: #ffffff;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #2c3e50;
            text-align: center;
            margin-bottom: 30px;
        }
        .search-container {
            margin-bottom: 30px;
            text-align: center;
        }
        .search-container label {
            font-weight: bold;
            margin-right: 10px;
            color: #555;
        }
        .search-container input {
            padding: 10px 15px;
            border: 2px solid #ccc;
            border-radius: 5px;
            width: 70%;
            max-width: 400px;
            font-size: 1rem;
            transition: border-color 0.3s ease;
        }
        .search-container input:focus {
            border-color: #007bff;
            outline: none;
        }
        .schedule {
            list-style: none;
            padding: 0;
        }
        .talk-item {
            background-color: #e9eff1;
            margin-bottom: 20px;
            padding: 20px;
            border-radius: 8px;
            border-left: 5px solid #007bff;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
            transition: transform 0.2s ease-in-out;
        }
        .talk-item:hover {
            transform: translateY(-5px);
        }
        .talk-item.lunch {
            background-color: #ffda79;
            border-left: 5px solid #ff9f1a;
            text-align: center;
            font-weight: bold;
            font-size: 1.2em;
            color: #5b4b0a;
        }
        .talk-item h2 {
            color: #007bff;
            margin-top: 0;
            margin-bottom: 10px;
            font-size: 1.5em;
        }
        .talk-item p {
            margin-bottom: 5px;
        }
        .talk-item .time {
            font-weight: bold;
            color: #555;
            margin-bottom: 10px;
            display: block;
        }
        .talk-item .speakers {
            font-style: italic;
            color: #666;
            margin-bottom: 10px;
            display: block;
        }
        .talk-item .category {
            font-size: 0.9em;
            color: #0056b3;
            background-color: #d0e8ff;
            padding: 3px 8px;
            border-radius: 4px;
            margin-right: 5px;
            display: inline-block;
            margin-top: 5px;
        }
        .talk-item .description {
            margin-top: 15px;
            border-top: 1px solid #cce5ff;
            padding-top: 15px;
            font-size: 0.95em;
            color: #444;
        }
        .no-results {
            text-align: center;
            color: #888;
            font-size: 1.2em;
            margin-top: 50px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Tech Event Schedule</h1>

        <div class="search-container">
            <label for="categorySearch">Search by Category:</label>
            <input type="text" id="categorySearch" placeholder="e.g., AI, JavaScript, DevOps">
        </div>

        <ul id="scheduleList" class="schedule">
            <!-- Schedule items will be populated here by JavaScript -->
        </ul>
        <div id="noResults" class="no-results" style="display: none;">No talks found for this category.</div>
    </div>

    <script>
        const scheduleData = ${JSON.stringify(fullSchedule, null, 2)};
        const scheduleList = document.getElementById('scheduleList');
        const categorySearchInput = document.getElementById('categorySearch');
        const noResultsDiv = document.getElementById('noResults');

        function renderSchedule(filteredSchedule) {
            scheduleList.innerHTML = ''; // Clear current schedule
            if (filteredSchedule.length === 0) {
                noResultsDiv.style.display = 'block';
                return;
            } else {
                noResultsDiv.style.display = 'none';
            }

            filteredSchedule.forEach(item => {
                const li = document.createElement('li');
                li.classList.add('talk-item');
                if (item.id === 'lunch') {
                    li.classList.add('lunch');
                    li.innerHTML = '<span class="time">' + item.startTime + ' - ' + item.endTime + '</span>' +
                                   '<h2>' + item.title + '</h2>';
                } else {
                    li.innerHTML = '<span class="time">' + item.startTime + ' - ' + item.endTime + '</span>' +
                                   '<h2>' + item.title + '</h2>' +
                                   '<span class="speakers">Speakers: ' + item.speakers.join(', ') + '</span>' +
                                   '<div>' +
                                   item.category.map(cat => '<span class="category">' + cat + '</span>').join('') +
                                   '</div>' +
                                   '<div class="description">' + item.description + '</div>';
                }
                scheduleList.appendChild(li);
            });
        }

        function filterSchedule() {
            const searchTerm = categorySearchInput.value.toLowerCase();
            const filtered = scheduleData.filter(item => {
                if (item.id === 'lunch') return true; // Always show lunch
                return item.category.some(cat => cat.toLowerCase().includes(searchTerm));
            });
            renderSchedule(filtered);
        }

        // Initial render
        renderSchedule(scheduleData);

        // Event listener for search input
        categorySearchInput.addEventListener('keyup', filterSchedule);
        categorySearchInput.addEventListener('change', filterSchedule); // For clearing with mouse
    </script>
</body>
</html>
`;

// Save the generated HTML to index.html
const fs = require('fs');
fs.writeFileSync('index.html', htmlContent);
console.log('index.html has been generated successfully!');
