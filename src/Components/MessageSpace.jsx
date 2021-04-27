function MessageSpace({msg, colour}) {
  return (
    <div className="message">
      <p style={{color:colour}}>{msg}</p>
    </div>
  )
}
export default MessageSpace;