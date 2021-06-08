const Notes = ({ date, content }) => {
  return (
    <li>
      <p>{content}</p>
      <small>{date}</small>
    </li>
  );
};

export default Notes;
