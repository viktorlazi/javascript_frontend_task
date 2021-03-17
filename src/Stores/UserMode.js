import { makeAutoObservable } from 'mobx'

class UserMode{
  isInEditMode = false
  constructor(){
    makeAutoObservable(this)
  }
  setEditMode(){
    this.isInEditMode = true
  }
  setListMode(){
    this.isInEditMode = false
  }
}

const userMode = new UserMode()
export default userMode