import React from "react";
import { ItemContext } from "../Home/Home";
import { AuthContext } from "../../App";

const CreateItem = (props) => {
    console.log(React.useContext(ItemContext))
  const { state, dispatch } = React.useContext(ItemContext);
  const { state: authState } = React.useContext(AuthContext);

  const [title, setTitle] = React.useState("");
  const [artist, setArtist] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");
 
  const onClose = e => {
    props.onClose && props.onClose(e);
  };

  const isButtonDisabled = title === "" || artist === "" || imageUrl === "" || state.isitemsubmitting;

  const onSubmit = () => {
      dispatch({
          type: "ADD_ITEM_REQUEST"
      })
      const item = {
        "title": title,
        "imageUrl": imageUrl,
        "artist": artist
      };
    fetch("https://hookedbe.herokuapp.com/api/items", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authState.token}`,
          "Content-Type": `application/json`
        },
        body: JSON.stringify(item),
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          } else {
            throw res;
          }
        })
        .then(data => {
            console.log(data);
            setArtist("");
            setTitle("");
            setImageUrl("");
            dispatch({
                type: "ADD_ITEM_SUCCESS",
                payload: data
            })
            onClose();
        }).catch(error => {
            dispatch({
                type: "ADD_ITEM_FAILURE"
            })
        })
  }
    if (!props.show) {
      return null;
    }
    return (
      <div class="modal" id="modal">
       <div className="modal-table-container">
        <div className="modal-table-cell">
         <div className="modal-overlay small">
              <div className="modal-header">
                <h1 className="modal-title">
                  ADD NEW ITEM
                </h1>
              </div>
              <form className="modal-form">
                <div className="modal-form-inputs">

                <label htmlFor="title">Title</label>
                    <input
                    id="title"
                    name="title"
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="text-input"
                    />

                <label htmlFor="artist">Artist</label>
                    <input
                    id="artist"
                    name="artist"
                    type="text"
                    value={artist}
                    onChange={e => setArtist(e.target.value)}
                    className="text-input"
                    />

                <label htmlFor="imageUrl">Image URL</label>
                    <input
                    id="imageUrl"
                    name="imageUrl"
                    type="text"
                    value={imageUrl}
                    onChange={e => setImageUrl(e.target.value)}
                    className="text-input"
                    />
                </div>


                
                <div className="form-error">
                      <p>
                        {state.itemHasError && "Error Creating item!"}
                      </p>
                </div>
                <div className="form-action clearfix">
                    <button
                      type="button"
                      id="overlay-confirm-button"
                      className="button button-primary"
                      onClick={onSubmit}
                      disabled={isButtonDisabled}
                    >
                      {state.isitemsubmitting ? "Submitting..." : "Submit"}
                    </button>
                    <button
                      type="button"
                      id="overlay-cancel-button"
                      className="button button-default small close-overlay pull-right"
                      onClick={onClose}
                    >
                          Cancel
                    </button>
                </div>
              </form>
        </div>
        </div>
       </div>
      </div>
    );
};

export default CreateItem;