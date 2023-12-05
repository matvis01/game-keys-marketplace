import { useEffect, useReducer } from "react"
import { useAccount } from "wagmi"
import { useRouter } from "next/router"

import Balance from "@/components/Profile/Balance"
import KeysContainer from "@/components/Profile/KeysContainer"
import OptionButton from "@/components/Profile/OptionButton"
import ListingsContainer from "@/components/Profile/ListingsContainer"

interface stateProps {
  showKeys: boolean
  showListings: boolean
}

interface actionProps {
  type: "SHOW_KEYS" | "SHOW_LISTINGS"
}

function reducer(state: stateProps, action: actionProps): stateProps {
  switch (action.type) {
    case "SHOW_KEYS":
      return { ...state, showKeys: true, showListings: false }
    case "SHOW_LISTINGS":
      return { ...state, showKeys: false, showListings: true }
    default:
      return state
  }
}

function Profile() {
  const [state, dispatch] = useReducer(reducer, {
    showKeys: true,
    showListings: false,
  })
  const { status } = useAccount()
  const router = useRouter()

  useEffect(() => {
    if (status !== "connected") {
      router.replace("/")
    }
  }, [status])

  return (
    <div className="flex justify-center">
      <div className="x w-3/4 lg:w-1/2">
        <Balance />
        <div className="mb-2 flex w-full gap-2">
          <OptionButton
            text="Keys"
            dispatchState={state.showKeys}
            dispatchFunction={() => dispatch({ type: "SHOW_KEYS" })}
          />
          <OptionButton
            text="Listings"
            dispatchState={state.showListings}
            dispatchFunction={() => dispatch({ type: "SHOW_LISTINGS" })}
          />
        </div>
        <div className="mb-4 h-96 p-1 pb-0 pl-0">
          {state.showKeys && <KeysContainer />}
          {state.showListings && <ListingsContainer />}
        </div>
      </div>
    </div>
  )
}

export default Profile
