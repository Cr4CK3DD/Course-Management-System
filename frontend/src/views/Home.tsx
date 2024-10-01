import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Course {
  title: string;
  description: string;
  instructor: string;
  schedule: string;
}

interface CourseData {
  currentPage: number;
  data: Course[];
  totalCourses: number;
  totalPages: number;
}

const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<CourseData | null>(null);
  const [originalCourses, setOriginalCourses] = useState<CourseData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [newCourse, setNewCourse] = useState<Course>({
    title: '',
    description: '',
    instructor: '',
    schedule: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const navigate = useNavigate();

  const fetchCourses = async (page: number = 1) => {
    try {
      const response = await axios.get(`http://localhost:3000/course?page=${page}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      });

      setCourses(response.data);
      setOriginalCourses(response.data);
      setErrorMessage(null);
    } catch (error: any) {
      console.error(error.response.data);
      setErrorMessage('Error fetching courses. Please try again.');
    }
  };

  const createCourse = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await axios.post('http://localhost:3000/course/create', newCourse, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      });

      setNewCourse({
        title: '',
        description: '',
        instructor: '',
        schedule: '',
      });

      await fetchCourses(currentPage);
      setIsModalOpen(false);
    } catch (error: any) {
      console.error(error.response.data);
      setErrorMessage('Error creating course. Please try again.');
    }
  };

  useEffect(() => {
    const validateToken = async () => {
      const token = Cookies.get('token');
      if (!token) {
        navigate('/');
        return;
      }
      try {
        const response = await axios.get('http://localhost:3000/auth/home', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          fetchCourses(currentPage);
        } else {
          Cookies.remove('token');
          navigate('/');
        }
      } catch (error) {
        console.error('Token validation failed:', error);
        Cookies.remove('token');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    validateToken();
  }, [navigate]);

  const handleCourseClick = (course: Course) => {
    setSelectedCourse(course);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    fetchCourses(newPage);
  };

  const closeModal = () => {
    setSelectedCourse(null);
    setIsModalOpen(false);
  };

  const searchCourseByName = async (query: string) => {
    if (!query) {
      setErrorMessage('Please enter a course name.');
      return;
    }

    setLoading(true);
    let found = false;

    try {
      for (let page = 1; page <= (courses?.totalPages || 1); page++) {
        const response = await axios.get(`http://localhost:3000/course?page=${page}`, {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
        });

        const courseData: CourseData = response.data;
        const foundCourse = courseData.data.find((course) => course.title.toLowerCase().includes(query.toLowerCase()));

        if (foundCourse) {
          setCourses({ ...courseData, data: [foundCourse] });
          found = true;
          break;
        }
      }

      if (!found) {
        setErrorMessage('Course not found.');
      }
    } catch (error: any) {
      setErrorMessage('Error searching for course. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToAllCourses = () => {
    setCourses(originalCourses);
    setSearchQuery('');
    setErrorMessage(null);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 p-4">
      <div className="flex justify-between w-full max-w-6xl mb-4">
        <h1 className="text-3xl font-bold">Available Courses</h1>
        <div className="flex gap-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search course by name"
            className="p-2 border border-gray-300 rounded"
          />
          <button
            onClick={() => searchCourseByName(searchQuery)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Search
          </button>
          <button 
            onClick={() => setIsModalOpen(true)} 
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Create Course
          </button>
        </div>
      </div>

      {errorMessage && <div className="text-red-600 mb-4">{errorMessage}</div>}

      {courses?.data.length === 0 ? (
        <p className="text-gray-600">No courses available at this time.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-6xl">
          {courses && courses.data.map((course, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-4 mb-4">
              <h2 
                className="text-xl font-semibold cursor-pointer hover:underline" 
                onClick={() => handleCourseClick(course)}
              >
                {course.title}
              </h2>
            </div>
          ))}
        </div>
      )}

      {selectedCourse && (
        <div className="mt-4 p-4 bg-white shadow-md rounded-lg w-full max-w-6xl">
          <h3 className="text-2xl font-semibold">{selectedCourse.title}</h3>
          <p className="text-gray-600">{selectedCourse.description}</p>
          <p className="text-gray-700">Instructor: {selectedCourse.instructor}</p>
          <p className="text-gray-700">Schedule: {selectedCourse.schedule}</p>
          <button
            onClick={() => setSelectedCourse(null)} // Clear selection
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Close
          </button>
        </div>
      )}

      {searchQuery && (
        <div className="mt-4">
          <button
            onClick={handleBackToAllCourses}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
          >
            Back to All Courses
          </button>
        </div>
      )}

      <div className="flex justify-between mt-4 w-full max-w-6xl">
        <button 
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button 
          disabled={currentPage === courses?.totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-md w-96 p-6">
            <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Create Course</h2>
            <form onSubmit={createCourse}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={newCourse.title}
                  onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                  className="p-2 border border-gray-300 rounded w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Description</label>
                <textarea
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                  className="p-2 border border-gray-300 rounded w-full"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Instructor</label>
                <input
                  type="text"
                  value={newCourse.instructor}
                  onChange={(e) => setNewCourse({ ...newCourse, instructor: e.target.value })}
                  className="p-2 border border-gray-300 rounded w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Schedule</label>
                <input
                  type="text"
                  value={newCourse.schedule}
                  onChange={(e) => setNewCourse({ ...newCourse, schedule: e.target.value })}
                  className="p-2 border border-gray-300 rounded w-full"
                  required
                />
              </div>
              <div className="flex justify-between">
                <button 
                  type="submit" 
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Create
                </button>
                <button 
                  type="button" 
                  onClick={closeModal} 
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
