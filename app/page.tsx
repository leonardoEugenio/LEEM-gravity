'use client'

import { useState, useEffect } from 'react'

export default function Home() {
  const [playerPositionX, setPlayerPositionX] = useState(0)
  const [playerPositionY, setPlayerPositionY] = useState(0)
  useEffect(() => {
    document.addEventListener('keydown', (e) => handleKeyPress(e.key))
  })

  class Player {
    _playerPositionY: number
    _playerPositionX: number
    _speedY: number
    _speedX: number

    constructor({
      positionX,
      positionY,
      speedY = 0,
      speedX = 0,
    }: {
      positionX: number
      positionY: number
      speedY?: number
      speedX?: number
    }) {
      this._playerPositionX = positionX
      this._playerPositionY = positionY
      this._speedY = speedY
      this._speedX = speedX
    }

    set playerPosition({
      positionX,
      positionY,
    }: {
      positionX: number
      positionY: number
    }) {
      setPlayerPositionX(positionX)
      setPlayerPositionY(positionY)
      this._playerPositionX = positionX
      this._playerPositionY = positionY
    }

    get playerPosition() {
      const playerPositionX = this._playerPositionX
      const playerPositionY = this._playerPositionY

      return { positionX: playerPositionX, positionY: playerPositionY }
    }
  }
  const player = new Player({ positionX: 0, positionY: 0 })

  function moviePlayer({ speedX, speedY }: { speedX: number; speedY: number }) {
    if (player._playerPositionX + speedX >= 468) {
      player.playerPosition = {
        positionX: 0,
        positionY: player._playerPositionY,
      }
    }

    if (player._playerPositionY + speedY >= 468) {
      player.playerPosition = {
        positionY: 0,
        positionX: player._playerPositionY,
      }
    }

    player.playerPosition = {
      positionY: player._playerPositionY + speedY,
      positionX: player._playerPositionX + speedX,
    }
    moviePlayer({ speedX, speedY })
  }

  function handleKeyPress(keyPress: string) {
    console.log(keyPress)
  }

  return (
    <div className="w-[500px] h-[500px] bg-neutral-900 border border-neutral-100 rounded-3xl relative focus:border-green-700">
      <div
        className="bg-blue-600 border transition-all border-neutral-100 absolute w-8 h-8 rounded-full"
        style={{ top: playerPositionY, left: playerPositionX }}
      ></div>
    </div>
  )
}
