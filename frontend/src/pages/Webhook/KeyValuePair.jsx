/* eslint-disable no-param-reassign */
export default function KeyValuePair({ keyValueArray, setKeyValueArray, heading }) {
  function handleDelete(deleteIndex) {
    keyValueArray.splice(deleteIndex, 1);
    setKeyValueArray([...keyValueArray]);
  }

  function handleAdd() {
    keyValueArray.push({ itemKey: Date.now(), key: '', value: '' });
    setKeyValueArray([...keyValueArray]);
  }

  function handleChange(itemIndex, isKey, event) {
    if (isKey) {
      keyValueArray[itemIndex].key = event.target.value;
    } else {
      keyValueArray[itemIndex].value = event.target.value;
    }
    setKeyValueArray([...keyValueArray]);
  }

  const elements = keyValueArray.map((item, index) => (
    <div key={item.itemKey} className="d-flex flex-row gap-3 align-items-center mt-1">
      <input type="text" value={item.key} placeholder="Key" onChange={(event) => handleChange(index, true, event)} className="form-control" />
      <input type="text" value={item.value} onChange={(event) => handleChange(index, false, event)} placeholder="Value" className="form-control" />
      <i
        aria-hidden="true"
        style={{ cursor: 'pointer' }}
        onClick={() => handleDelete(index)}
        className="fas fa-times-circle"
      />
    </div>
  ));

  return (
    <>
      <label htmlFor="exampleInputPassword1" className="form-label">
        { heading }
        <i
          style={{ cursor: 'pointer' }}
          aria-hidden="true"
          className="ms-1 fa-solid fa-circle-plus"
          onClick={() => handleAdd()}
        />
      </label>
      { elements }
    </>
  );
}
