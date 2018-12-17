import React, { Component } from 'react'
import GetCatsNames from './api/GetCatsNames'
import './App.css'

const PetListByTypeAndName = ({ catsNamesByAndOwnerGender }) => {
  const filterByGender = gen => catsNamesByAndOwnerGender.filter(ownerGender => ownerGender.gender === gen)
  return (
    <>
      <strong>Owner Gender: Male</strong>
      <ul>
        <li>
          { filterByGender('Male').map(x => (
            <p>
              {x.catName}
            </p>
          )) }
        </li>
      </ul>
      <strong>Owner Gender: Female</strong>
      <ul>
        <li>
          { filterByGender('Female').map(x => (
            <p>
              {x.catName}
            </p>
          )) }
        </li>
      </ul>
      </>
  )
}
class App extends Component {
  state= {
    petDetails: [],
  }

  componentDidMount() {
    GetCatsNames().then(res => this.setState({ petDetails: res.data }))
  }

  sorrByGenderAndName = () => {
    const { petDetails } = this.state
    return petDetails.reduce((cats, catItem) => {
      const petByCatType = catItem.pets && catItem.pets.filter(x => x.type === 'Cat')
      catItem.pets && petByCatType.forEach(cat => cats.push({ catName: cat.name, gender: catItem.gender }))
      return cats.sort((a, b) => {
        const nameA = a.catName.toUpperCase()
        const nameB = b.catName.toUpperCase()
        if (nameA < nameB) {
          return -1
        }
        if (nameA > nameB) {
          return 1
        }
        return 0
      })
    }, [])
  }

  render() {
    return (
      <div className="App">
        <PetListByTypeAndName
          catsNamesByAndOwnerGender={ this.sorrByGenderAndName() }
        />
      </div>
    )
  }
}

export default App
