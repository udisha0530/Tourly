import { Button } from "@/components/button";
import {
  AI_PROMPT,
  selectBudgetoption,
  selectTravelersList,
} from "@/constant/option";
import { React, useState, useEffect } from "react";
import { toast } from "sonner";
import { chatSession } from "@/service/AIModel";
//import { animate, scroll } from "motion";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { db } from "@/service/firebaseConfig";
import { useNavigate, useNavigation } from "react-router-dom";

function Createtrip() {
  const [destination, setDestination] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [apiKey] = useState(import.meta.env.VITE_RAPID_GOOGLE_PLACES_API_KEY); // Store your API key
  const [isFetching, setIsFetching] = useState(false);
  const [formData, setFormData] = useState([]);
  const [openDailog, setOpenDailog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  useEffect(() => {
    console.log("Form data:", formData);
  }, [formData]);

  const fetchSuggestions = async (query) => {
    const endpoint =
      "https://google-map-places.p.rapidapi.com/maps/api/place/autocomplete/json";
    const url = `${endpoint}?input=${query}&language=en`; // Input and language parameters as per the API documentation
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": "google-map-places.p.rapidapi.com",
        "X-RapidAPI-Key": apiKey,
      },
    };

    try {
      setIsFetching(true); // Set loading state
      const response = await fetch(url, options);
      const data = await response.json();
      console.log("Response data:", data);
      // Clear previous suggestions
      setSuggestions([]);

      if (data.predictions && data.predictions.length > 0) {
        setSuggestions(data.predictions); // Use the predictions array for suggestions
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    } finally {
      setIsFetching(false); // Reset loading state
    }
  };

  const handlesearchInputChange = (e) => {
    const inputValue = e.target.value;
    setDestination(inputValue);
    setDestination(inputValue);
    handleInputChange("destination", inputValue);
    if (inputValue.length >= 3 && inputValue.length % 3 === 0) {
      fetchSuggestions(inputValue); // Call API every two characters after the second one
    } else if (inputValue.length <= 2) {
      setSuggestions([]); // Clear suggestions if input is too short
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setDestination(suggestion.description); // Set the selected suggestion
    handleInputChange("destination", suggestion.description);
    setSuggestions([]); // Clear suggestions after selection
  };

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    //onSuccess:(codeResp)=>console.log(codeResp),
    onError: (error) => error,
  });

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDailog(true);
      return;
    }
    if (
      (formData?.noOfDays > 5 && !formData?.destination) ||
      !formData?.budget ||
      !formData?.travellers
    ) {
      toast("please enter all details");
      return;
    }

    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace(
      "{destination}",
      formData?.destination
    )
      .replace("{noOfDays}", formData?.noOfDays)
      .replace("{traveller}", formData?.travellers)
      .replace("{budget}", formData?.budget)
      .replace("{noOfDays}", formData?.noOfDays)
      .replace("{destination}", formData?.destination);

    //console.log(FINAL_PROMPT);
    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log("--", result?.response?.text());
    setLoading(false);
    saveaitrip(result?.response?.text());
  };
  const saveaitrip = async (TripData) => {
    setLoading(true);

    const user = JSON.parse(localStorage.getItem("user"));
    const docid = Date.now().toString();

    try {
      await setDoc(doc(db, "aitrips", docid), {
        userSelection: formData,
        tripData: JSON.parse(TripData), // Use sanitizedTripData
        userEmail: user?.email,
        id: docid,
      });
      console.log("Document successfully written!");
    } catch (error) {
      console.error("Error writing document: ", error);
    } finally {
      setLoading(false);
    }
    navigate('/view-trip/' +docid)
  }; 

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(`https://www.googleapis.com/oauth2/v1/userinfo?acess_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDailog(false);
        OnGenerateTrip();
      })
      .catch((error) => {
        console.error(
          "Error fetching user profile:",
          error.response || error.message
        );
      });
  };
  return (
    <div
    style={{
      backgroundImage: "url('/cloudpic2.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      padding: '4rem',
    }}
    >
    <div className="sm:px-10 md:px-32 lg:px-48 xl:px-56 px-5 mt-10 text-center bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen rounded-xl"
    style={{
      backgroundImage: "url('/light.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <h2 className="font-extrabold text-5xl text-gray-800 tracking-tight mb-4">
        Tell Us Your Travel Preference
      </h2>
      <p className="mt-3 text-gray-600 text-lg lg:text-xl max-w-2xl mx-auto">
        Select your travel style, pace, and budget to get a trip that matches
        your vibe. <br />
        Discover unique destinations, popular sights, and hidden gems for an
        exciting adventure.
      </p>
      <div className="mt-16 space-y-12">
        {/* Destination Input */}
        <div className="relative bg-white rounded-lg shadow-lg p-6 md:p-8 transition hover:shadow-xl">
          <h2 className="text-4xl font-semibold text-gray-700 mb-2">
            What is your destination?
          </h2>
          <input
            type="text"
            value={destination}
            onChange={handlesearchInputChange}
            placeholder="Enter your destination"
            className="border border- gray-500 rounded-lg p-3 w-full h-14 text-lg text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary transition"
          />
          {isFetching ? (
            <div className="mt-2 text-gray-500">Loading...</div> // Display loading state
          ) : (
            suggestions.length > 0 && (
              <div className="mt-2 relative rounded-lg text-lg focus:ring-2 border border-gray-300  text-left pl-2">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="p-3 cursor-pointer hover:bg-gray-200"
                  >
                    {suggestion.description}{" "}
                    {/* Display the suggestion description */}
                  </div>
                ))}
              </div>
            )
          )}
        </div>
        {/* Days of Stay Input */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 transition hover:shadow-xl">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            How many days are you planning to stay?
          </h2>
          <input
            type="number"
            placeholder="Ex. 3"
            className="border border-gray-300 rounded-lg p-3 w-full h-14 text-lg text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary transition"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>

        {/* Budget Selection */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Choose your Budget
          </h2>
          <div className="grid grid-cols-3 gap-5 mt-5 ">
            {selectBudgetoption.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("budget", item.title)}
                className={`p-4 border rounded-lg  bg-white transition-transform transform hover:scale-105 hover:shadow-xl
                ${formData?.budget == item.title && "shadow-lg border-black"}
              `}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-gray-500  text-sm">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        {/* Travelers Selection */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Who are you travelling with?
          </h2>
          <div className="grid grid-cols-3 gap-5 mt-5 ">
            {selectTravelersList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("travellers", item.people)}
                className={`p-4 border rounded-lg  bg-white transition-transform transform hover:scale-105 hover:shadow-xl
                ${
                  formData?.travellers == item.people &&
                  "shadow-lg border-black"
                }
              `}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-gray-500  text-sm">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="my-10 justify-end flex">
        <Button disabled={loading} onClick={OnGenerateTrip}>
          {loading ? (
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
          ) : (
            "Generate Trip"
          )}
        </Button>
      </div>
      <Dialog open={openDailog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <div className="flex items-center">
                <img src="/tourlogo.jpg" className="w-20 h-20 mr-3" />
                <span className="text-lg font-bold italic text-black">
                  Your Ultimate Tour Planner
                  <span style={{ fontSize: "1.75em" }}>🛫</span>{" "}
                </span>
              </div>
              <h2 className="font-bold text-lg mt-7 text-black">
                Sign in with Google.
              </h2>
              <p className="text-black">
                Sign in to the app with google authentication.
              </p>
              <Button onClick={login} className="w-full mt-5">
                <FcGoogle />
                &nbsp; <span className="text-white">Sign In With Google.</span>
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      </div>
    </div>
  );
}

export default Createtrip;