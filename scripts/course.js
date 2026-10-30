// Web and Computer Programming Certificate Courses
const courses = [
  {
    subject: 'CSE',
    number: 110,
    title: 'Introduction to Programming',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
    technology: ['Python'],
    completed: true
  },
  {
    subject: 'WDD',
    number: 130,
    title: 'Web Fundamentals',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
    technology: ['HTML', 'CSS'],
    completed: true
  },
  {
    subject: 'CSE',
    number: 111,
    title: 'Programming with Functions',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call, debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
    technology: ['Python'],
    completed: true
  },
  {
    subject: 'CSE',
    number: 210,
    title: 'Programming with Classes',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
    technology: ['C#'],
    completed: false
  },
  {
    subject: 'WDD',
    number: 131,
    title: 'Dynamic Web Fundamentals',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
    technology: ['HTML', 'CSS', 'JavaScript'],
    completed: true
  },
  {
    subject: 'WDD',
    number: 231,
    title: 'Frontend Web Development I',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
    technology: ['HTML', 'CSS', 'JavaScript'],
    completed: false
  }
];

const courseContainer = document.querySelector('#course-cards');
const creditTotalDisplay = document.querySelector('#credit-total');
const filterButtons = document.querySelectorAll('.filter-btn');

function displayCourses(courseList) {
  if (!courseContainer) return;
  courseContainer.innerHTML = '';

  courseList.forEach(course => {
    const card = document.createElement('div');
    card.className = `course-card ${course.completed ? 'completed' : 'incomplete'}`;
    card.setAttribute('role', 'article');
    card.setAttribute('aria-label', `${course.subject} ${course.number}: ${course.title}`);

    const courseCode = document.createElement('span');
    courseCode.className = 'course-code';
    courseCode.textContent = `${course.subject} ${course.number}`;

    if (course.completed) {
      const checkBadge = document.createElement('span');
      checkBadge.className = 'completion-badge';
      checkBadge.innerHTML = '&#10003;';
      checkBadge.setAttribute('title', 'Completed');
      card.appendChild(checkBadge);
    }

    card.appendChild(courseCode);
    courseContainer.appendChild(card);
  });

  // Calculate total credits for currently displayed courses using reduce()
  const totalCredits = courseList.reduce((accumulator, currentCourse) => accumulator + currentCourse.credits, 0);

  if (creditTotalDisplay) {
    creditTotalDisplay.textContent = `The total credits for courses listed above is ${totalCredits}`;
  }
}

// Filter button events
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const filter = button.getAttribute('data-filter');
    if (filter === 'all') {
      displayCourses(courses);
    } else {
      const filtered = courses.filter(course => course.subject.toLowerCase() === filter.toLowerCase());
      displayCourses(filtered);
    }
  });
});

// Initial display on load
displayCourses(courses);
