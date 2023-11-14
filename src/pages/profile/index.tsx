import useContractFunctions from "../../hooks/useContractFunctions"

function Profile() {
  const { balance, handleWithdraw } = useContractFunctions()
  return (
    <div>
      <h1>Profile</h1>
      <h2>Balance: {balance}</h2>
      <button className="btn btn-primary" onClick={handleWithdraw}>
        Withdraw
      </button>
    </div>
  )
}

export default Profile
