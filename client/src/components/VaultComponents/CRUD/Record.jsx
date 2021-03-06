import { useState, useEffect } from "react";
import axios from "axios";
import "../../../styles/Vault/Record.css";
import { FaTrash } from "react-icons/fa";
import { IoEllipsisVerticalOutline } from "react-icons/io5";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import { Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdEdit, MdOutlineRestorePage } from "react-icons/md";

import React from "react";
axios.defaults.withCredentials = true;

const Record = ({
  site,
  sites,
  setSites,
  setModal,
  setSiteModal,
  star,
  setDelModal,
  setRestoreModal,
}) => {
  // const [status, setStatus] = useState(1); // hidden-1, show-0
  const [menu, setMenu] = useState(false);
  const [fav, setFav] = useState(site.favorite);

  const toggleStar = async () => {
    if (fav === true) {
      setFav(false);
      await axios.patch(
        `http://localhost:5000/api/record-edit/${site._id}`,
        {
          favorite: false,
        },
        {
          withCredentials: true,
        }
      );
    } else {
      setFav(true);
      await axios.patch(
        `http://localhost:5000/api/record-edit/${site._id}`,
        {
          favorite: true,
        },
        {
          withCredentials: true,
        }
      );
    }
  };

  useEffect(() => {
    const decryptPassword = async (siteObj) => {
      const res = await axios.post(
        `http://localhost:5000/api/vault-decrypt-password/`,
        { siteObj: { password: site.password } },
        {
          withCredentials: true,
        }
      );
      siteObj.password = res.data;
      setSites(
        sites.map((site) => {
          return site._id === siteObj._id
            ? {
                _id: site._id,
                siteUrl: site.siteUrl,
                uname: site.uname,
                password: res.data,
              }
            : site;
        })
      );
    };
    decryptPassword(site);
    // eslint-disable-next-line
  }, []);

  const removeRecord = async (siteId) => {
    try {
      toast.warn("Item Moved to trash!", {
        autoClose: 1500,
        hideProgressBar: true,
        transition: Slide,
      });
      await axios.delete(`http://localhost:5000/api/record-delete/${siteId}`, {
        withCredentials: true,
      });
      setSites(
        sites.filter((val) => {
          return val._id !== siteId;
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const editStuff = (site) => {
    setModal(true);
    setSiteModal(site);
  };

  const restore = (site) => {
    setRestoreModal(true);
    setSiteModal(site);
  };

  const permenantDelete = (site) => {
    setDelModal(true);
    setSiteModal(site);
  };

  return (
    <>
      <section className="vault__contents">
        <span className="vault__contents--menu">
          {star && (
            <span onClick={() => toggleStar()}>
              {fav === true ? <AiFillStar /> : <AiOutlineStar />}
            </span>
          )}
          {<IoEllipsisVerticalOutline onClick={() => setMenu(!menu)} />}
        </span>
        <div className="menu__links">
          <div className="menu__dropdown">
            {menu && (
              <div className="vault__contents--edit-icons">
                {star && (
                  <>
                    <div>
                      <span
                        onClick={() => removeRecord(site._id)}
                        className="trash"
                      >
                        <FaTrash />
                        Remove
                      </span>
                    </div>
                    <div>
                      <span onClick={() => editStuff(site)} className="edit">
                        <MdEdit />
                        Edit
                      </span>
                    </div>
                  </>
                )}
                {!star && (
                  <>
                    <div>
                      <span onClick={() => restore(site)} className="restore">
                        <MdOutlineRestorePage />
                        Restore
                      </span>
                    </div>
                    <div>
                      <span
                        onClick={() => permenantDelete(site)}
                        className="restore"
                      >
                        <FaTrash />
                        Delete
                      </span>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="record__container">
          <div>
            <img
              className="record__favicon"
              src={`https://icon.horse/icon/${site.siteUrl}/`}
              // src={`https://icons.duckduckgo.com/ip3/${site.siteUrl}.ico`}
              alt="No Favicon"
            />
          </div>
          <div>
            <p className="record__title" onClick={() => editStuff(site)}>
              <b>{site.siteUrl}</b>
            </p>
            <p>{site.uname}</p>
          </div>
        </div>
        <ToastContainer />
      </section>
    </>
  );
};

export default Record;
