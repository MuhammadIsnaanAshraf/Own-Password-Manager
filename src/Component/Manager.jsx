import React from "react";
import { useRef, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Manager = () => {
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [formData, setformData] = useState([]);
  const ref = useRef();
  const passwordref = useRef();

  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000/");
    let password = await req.json();
    console.log(password);
    setformData(password);
  };

  useEffect(() => {
    getPasswords();
  }, []);

  const togglePassword = () => {
    // console.log(ref.current);
    if (ref.current.className.includes("fa-eye-slash")) {
      passwordref.current.type = "password";
      // console.log("changing");
      ref.current.className = "fa-solid fa-eye";
    } else {
      // console.log("show icons");
      ref.current.className = "fa-solid fa-eye-slash";
      passwordref.current.type = "text";
    }
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const saveForm = async () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: form.id }),
      });
      // await fetch("http://localhost:3000/", {
      //   method: " DELETE",
      //   headers: { "content-type": "application/json" },
      //   body: JSON.stringify({ id: form.id }),
      // });

      await fetch("http://localhost:3000/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...form, id: uuidv4() }),
      });

      setformData([...formData, { ...form, id: uuidv4() }]);

      // localStorage.setItem(
      //   "formsData"
      // JSON.stringify([...formData, { ...form, id: uuidv4() }])
      // );

      setform({ site: "", username: "", password: "" });
      console.log(formData);
    } else {
      // toast("Not saved", {
      //   position: "top-right",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "light",
      //   transition: "Bounce",
      // });
    }
  };

  const editPassword = (id) => {
    // const editForm = formData.filter((item) => item.id == id)[0];
    // console.log(editForm);
    setform({ ...formData.filter((item) => item.id == id)[0], id: id });
    setformData(formData.filter((item) => item.id != id));
  };

  const deletepassword = async (id) => {
    setformData(formData.filter((item) => item.id != id));

    await fetch("http://localhost:3000/", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    // localStorage.setItem(
    //   "formsData",
    //   JSON.stringify(formData.filter((item) => item.id != id))
    // );
    // toast("Password deleted successfully", {
    //   position: "top-right",
    //   autoClose: 5000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   theme: "light",
    //   transition: "Bounce",
    // });
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="container sm:w-3/4 sm:mx-auto  text-center my-10 ">
      {/* <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        // pauseOnHover
        theme="light"
        transition="Bounce"
      />
      <ToastContainer /> */}
      <div className="absolute top-0 right-[1px] z-[-2] h-screen w-screen bg-green-50 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(106,196,100,0.4),rgba(255,255,255,0))]"></div>
      <div className="absolute top-0 right-[1px] z-[-2] h-screen w-screen bg-green-50 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(106,196,100,0.4),rgba(255,255,255,0))]"></div>
      <div className="text-green-700 font-bold text-2xl my-2">
        <span>&lt;</span>
        <span className="text-black">
          <i>Lock</i>
        </span>
        <span>Box</span>
        <span>/&gt;</span>
        <p className="py-2 mx-2 text-lg text-black font-medium">
          Effortless password management for ultimate security
        </p>
      </div>
      <div className="form-container text-center mx-3 my-6">
        <div className="my-2">
          <input
            type="text"
            value={form.site}
            onChange={handleChange}
            name="site"
            className=" border-2 border-green-800 rounded-full py-1 px-4 w-full "
            placeholder="Enter Website Url "
          />
        </div>
        <div className="w-full my-3 flex sm:flex-row flex-col gap-4">
          <div className=" w-full">
            <input
              type="text"
              value={form.username}
              onChange={handleChange}
              name="username"
              className="border-2 border-green-800 rounded-full py-1  w-full px-2 "
              placeholder="Enter Username"
            />
          </div>
          <div className="relative">
            <input
              type="password"
              ref={passwordref}
              value={form.password}
              onChange={handleChange}
              name="password"
              className="border-2 border-green-800 rounded-full py-1 px-3  w-full"
              placeholder="Enter Password"
            />
            <span
              className=" absolute right-2.5 top-1.5"
              onClick={togglePassword}
            >
              <i ref={ref} className="fa-solid fa-eye"></i>
            </span>
          </div>
        </div>
      </div>
      <button
        className="bg-green-700 px-1 py-1.5 my-3  min-w-28 lg:w-1/6 rounded-full text-white font-bold text-lg"
        onClick={saveForm}
      >
        <lord-icon
          src="https://cdn.lordicon.com/jgnvfzqg.json"
          trigger="hover"
          style={{ paddingTop: "5px", height: "1.5rem" }}
        ></lord-icon>

        <span className="sm:px-2">Add</span>
      </button>
      <div className="my-5">
        <h3 className="font-bold  my-4 text-left text-2xl">All passwords</h3>
        {formData.length === 0 && (
          <div className="mt-10">No password to show</div>
        )}

        {formData.length != 0 && (
          <table className="table-auto w-full my-2 rounded-md overflow-hidden ">
            <thead className="bg-green-700  text-white py-4 ">
              <tr className="">
                <th className="py-1.5 sm:font-bold font-normal w-1/3">
                  Website
                </th>
                <th className="py-1.5 sm:font-bold font-normal">Username</th>
                <th className="py-1.5 sm:font-bold font-normal">Password</th>
                <th className="py-1.5 sm:font-bold font-normal">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-green-100 border border-white">
              {formData.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="py-2  ">
                      <a href={item.site} target="_blank">
                        {item.site}
                      </a>
                      <span>
                        <i
                          className="fa-solid fa-copy cursor-pointer  md:mx-2"
                          onClick={() => {
                            copyText(item.site);
                          }}
                        ></i>
                      </span>
                    </td>
                    <td className="py-2 ">
                      {item.username}
                      <span>
                        <i
                          className="fa-solid fa-copy cursor-pointer md:mx-2"
                          onClick={() => {
                            copyText(item.username);
                          }}
                        ></i>
                      </span>
                    </td>
                    <td className="py-2 ">
                      {"*".repeat(item.password.length)}
                      <span>
                        <i
                          className="fa-solid fa-copy cursor-pointer md:mx-2"
                          onClick={() => {
                            copyText(item.password);
                          }}
                        ></i>
                      </span>
                    </td>
                    <td className="py-2">
                      <span>
                        <lord-icon
                          src="https://cdn.lordicon.com/msbrflth.json"
                          trigger="hover"
                          onClick={() => {
                            editPassword(item.id);
                          }}
                          style={{
                            width: "20px",
                            height: "20px",
                            marginRight: "4px",
                            cursor: "pointer",
                          }}
                        ></lord-icon>
                      </span>
                      <span>
                        <lord-icon
                          src="https://cdn.lordicon.com/bhvdbxim.json"
                          trigger="hover"
                          onClick={() => {
                            deletepassword(item.id);
                          }}
                          style={{
                            width: "20px",
                            height: "20px",
                            marginLeft: "4px",
                            cursor: "pointer",
                          }}
                        ></lord-icon>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
