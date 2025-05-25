import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { profileOnboarding } from "../api/api";

const Onboarding = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { updateUserProfile } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    countryCode: "",
    contact: "",
    gender: "",
    age: "",
    nid: "",
  });
  const [profilePicture, setProfilePicture] = useState(null);
  const [citizenshipFront, setCitizenshipFront] = useState(null);
  const [citizenshipFrontPreview, setCitizenshipFrontPreview] = useState(null);
  const [citizenshipBack, setCitizenshipBack] = useState(null);
  const [citizenshipBackPreview, setCitizenshipBackPreview] = useState(null);
  const { user, validateUser } = useAuth();

  // Check authentication and onboarding status on initial render
  useEffect(() => {
    try {
      const user = validateUser();

      if (!user?.id) {
        // If not authenticated, redirect to login
        navigate("/login", { state: { from: "/onboarding" }, replace: true });
      } else if (user.isOnboarded) {
        // If already onboarded, redirect to home
        navigate("/", { replace: true });
      }
    } catch (error) {
      navigate("/login", { state: { from: "/onboarding" }, replace: true });
    }
  }, [navigate, validateUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      let currentUser;
      try {
        currentUser = validateUser();

        if (!currentUser?.id) {
          throw new Error("User not authenticated");
        }
      } catch (authError) {
        localStorage.removeItem("user");
        updateUserProfile(null);
        navigate("/login", { state: { from: "/onboarding" } });
        return;
      }

      if (currentUser.isOnboarded) {
        navigate("/", { replace: true }); //redirect if already onboarded
        return;
      }

      if (!formData.firstName || !formData.lastName) {
        throw new Error("First name and last name are required");
      }

      if (!formData.countryCode || formData.countryCode.length === 0) {
        throw new Error("Country code is required");
      }

      if (!formData.contact) {
        throw new Error("Contact number is required");
      }

      if (!formData.nid || formData.nid.length !== 10) {
        throw new Error("NID should be 10 digits");
      }

      if (!citizenshipFront || !citizenshipBack) {
        throw new Error("Both sides of the citizenship are required");
      }

      //create FormData object
      const formDataToSend = new FormData();

      //append text fields
      formDataToSend.append("first_name", formData.firstName);
      formDataToSend.append("last_name", formData.lastName);
      formDataToSend.append("country_code", formData.countryCode);
      formDataToSend.append("contact", formData.contact);
      formDataToSend.append("gender", formData.gender);
      formDataToSend.append("age", formData.age);
      formDataToSend.append("nid", formData.nid);

      //append files directly
      if (profilePicture) {
        formDataToSend.append("profile_picture", profilePicture);
      }
      if (citizenshipFront) {
        formDataToSend.append("citizenship_front", citizenshipFront);
      }
      if (citizenshipBack) {
        formDataToSend.append("citizenship_back", citizenshipBack);
      }

      //call api with formdata
      const response = await profileOnboarding(currentUser.id, formDataToSend);

      //update usecontext and local storage
      const updatedUser = {
        ...currentUser,
        ...response.data.user,
        isOnboarded: true,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));
      updateUserProfile(updatedUser);

      navigate("/", { replace: true });
    } catch (error) {
      console.error("Error during onboarding:", error);
      setError(
        error?.message?.includes("user information") ||
          error?.message?.includes("not authenticated")
          ? "Session Expired. please login again."
          : error.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Complete Your Profile
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Please provide your information to get started
        </p>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className=" flex flex-col items-center space-y-4">
              <label
                htmlFor="profilePicture"
                className="block text-lg text-gray-700 font-extrabold"
              >
                Profile Picture
              </label>
              <div className="mt-1">
                <input
                  id="profilePicture"
                  name="profilePicture"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setProfilePicture(file);
                    }
                  }}
                  className="block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-md file:border-0
                            file:text-sm file:font-semibold
                            file:bg-indigo-50 file:text-indigo-700
                            hover:file:bg-indigo-100"
                />
              </div>
              {profilePicture && (
                <div className="relative">
                  <img
                    src={URL.createObjectURL(profilePicture)}
                    alt="profile Preview"
                    className="mt-2 w-32 h-32 object-cover rounded-full"
                  />
                  <button
                    type="button"
                    onClick={() => setProfilePicture(null)}
                    className="absolute top-1 right-1 bg-white rounded-full p-1 shadow hover:bg-red-300"
                    aria-label="remove profile picture"
                  >
                    ✖
                  </button>
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <div className="mt-1">
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <div className="mt-1">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="countryName"
                className="block text-sm font-medium text-gray-700"
              >
                Country Code
              </label>
              <div className="mt-1">
                <input
                  id="countryCode"
                  name="countryCode"
                  type="text"
                  maxLength={4}
                  required
                  value={formData.countryCode}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="contact"
                className="block text-sm font-medium text-gray-700"
              >
                Contact Number
              </label>
              <div className="mt-1">
                <input
                  id="contact"
                  name="contact"
                  type="tel"
                  required
                  value={formData.contact}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-700"
              >
                Gender
              </label>
              <div className="mt-1">
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Fe-Male">FeMale</option>
                  <option value="Others">Others</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="age"
                className="block text-sm font-medium text-gray-700"
              >
                Age
              </label>
              <div className="mt-1">
                <input
                  id="age"
                  name="age"
                  type="number"
                  min="16"
                  max="100"
                  required
                  value={formData.age}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="nid"
                className="block text-sm font-medium text-gray-700"
              >
                NID (Should be 10 digits)
              </label>
              <div className="mt-1">
                <input
                  id="nid"
                  name="nid"
                  type="text"
                  pattern="\d{10}"
                  maxLength="10"
                  required
                  value={formData.nid}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-4">
              <label className="block text-lg font-medium text-gray-700">
                Upload Citizenship (Front & Back)
              </label>

              {/* Front Side Upload */}
              <div className="space-y-1">
                <p className="text-sm font-semibold text-gray-600">
                  Front Side
                </p>
                <input
                  id="citizenshipFront"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setCitizenshipFront(file);
                      setCitizenshipFrontPreview(URL.createObjectURL(file));
                    }
                  }}
                  className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-indigo-50 file:text-indigo-700
                      hover:file:bg-indigo-100"
                />

                {citizenshipFrontPreview && (
                  <div className="relative w-fit mt-2">
                    <img
                      src={citizenshipFrontPreview}
                      alt="Citizenship Front"
                      className="w-40 h-auto rounded border"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setCitizenshipFront(null);
                        setCitizenshipFrontPreview(null);
                        document.getElementById("citizenshipFront").value =
                          null;
                      }}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center -translate-y-1/2 translate-x-1/2"
                      title="Remove"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>

              {/* Back Side Upload */}
              <div className="space-y-1">
                <p className="text-sm font-semibold text-gray-600">Back Side</p>
                <input
                  id="citizenshipBack"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setCitizenshipBack(file);
                      setCitizenshipBackPreview(URL.createObjectURL(file));
                    }
                  }}
                  className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-indigo-50 file:text-indigo-700
                      hover:file:bg-indigo-100"
                />

                {citizenshipBackPreview && (
                  <div className="relative w-fit mt-2">
                    <img
                      src={citizenshipBackPreview}
                      alt="Citizenship Back"
                      className="w-40 h-auto rounded border"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setCitizenshipBack(null);
                        setCitizenshipBackPreview(null);
                        document.getElementById("citizenshipBack").value = null;
                      }}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center -translate-y-1/2 translate-x-1/2"
                      title="Remove"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              >
                {isLoading ? "processing..." : "Complete Profile"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
