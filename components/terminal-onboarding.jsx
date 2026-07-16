'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Terminal } from 'lucide-react'

export function TerminalOnboarding() {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([
    { type: 'system', text: 'Welcome to the Enigma Mainframe.' },
    { type: 'system', text: 'Type "help" to see available commands or "join" to initiate the recruitment sequence.' },
  ])
  const [isBooting, setIsBooting] = useState(true)
  const inputRef = useRef(null)
  const terminalRef = useRef(null)

  useEffect(() => {
    // Simulate boot sequence
    const timer = setTimeout(() => setIsBooting(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isBooting && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isBooting])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  const asciiLogo = `
  ______       _                       
 |  ____|     (_)                      
 | |__   _ __  _  __ _ _ __ ___   __ _ 
 |  __| | '_ \\| |/ _\` | '_ \` _ \\ / _\` |
 | |____| | | | | (_| | | | | | | (_| |
 |______|_| |_|_|\\__, |_| |_| |_|\\__,_|
                  __/ |                
                 |___/                 
  `

  const handleCommand = (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase()
    let response = []

    switch (trimmedCmd) {
      case 'help':
        response = [
          { type: 'system', text: 'Available commands:' },
          { type: 'system', text: '  about  - Learn about Enigma' },
          { type: 'system', text: '  join   - Start the recruitment sequence' },
          { type: 'system', text: '  clear  - Clear the terminal' },
          { type: 'system', text: '  sudo   - Execute root command' }
        ]
        break
      case 'about':
        response = [
          { type: 'system', text: 'Enigma is the premier technical club at AIMT.' },
          { type: 'system', text: 'We build, we break, we innovate.' }
        ]
        break
      case 'sudo':
        response = [
          { type: 'error', text: 'Error: Access Denied. This incident will be reported.' }
        ]
        break
      case 'clear':
        setHistory([])
        return
      case 'join':
      case 'join enigma':
        response = [
          { type: 'system', text: asciiLogo, isAscii: true },
          { type: 'success', text: 'Recruitment sequence initiated.' },
          { type: 'system', text: 'Redirecting to onboarding form in 3 seconds...' }
        ]
        setTimeout(() => {
          window.location.href = '/new-members'
        }, 3000)
        break
      case '':
        break
      default:
        response = [
          { type: 'error', text: `Command not found: ${trimmedCmd}` }
        ]
    }

    if (trimmedCmd !== '') {
      setHistory(prev => [...prev, { type: 'user', text: `guest@enigma:~$ ${cmd}` }, ...response])
    } else {
      setHistory(prev => [...prev, { type: 'user', text: 'guest@enigma:~$' }])
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input)
      setInput('')
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto rounded-xl overflow-hidden shadow-2xl border border-border/50 bg-[#0c0c0c] font-mono text-sm sm:text-base">
      
      {/* Terminal Header */}
      <div className="flex items-center px-4 py-2 bg-[#1a1a1a] border-b border-[#333]">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="flex-1 flex justify-center items-center gap-2 text-xs font-bold text-[#666]">
          <Terminal className="w-3.5 h-3.5" /> root@enigma-mainframe
        </div>
      </div>

      {/* Terminal Body */}
      <div 
        ref={terminalRef}
        className="p-6 h-[400px] overflow-y-auto text-[#00ff00] custom-scrollbar"
        onClick={() => inputRef.current?.focus()}
      >
        {isBooting ? (
          <div className="flex flex-col space-y-2">
            <div className="animate-pulse">Loading Enigma Kernel v4.2.0...</div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>Mounting file systems... [OK]</motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>Starting network interfaces... [OK]</motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>Establishing secure connection... [OK]</motion.div>
          </div>
        ) : (
          <div className="flex flex-col space-y-2">
            {history.map((line, i) => (
              <div 
                key={i} 
                className={`
                  ${line.type === 'user' ? 'text-white' : ''}
                  ${line.type === 'error' ? 'text-red-500' : ''}
                  ${line.type === 'success' ? 'text-green-400 font-bold' : ''}
                  ${line.isAscii ? 'whitespace-pre text-primary leading-tight' : 'break-words'}
                `}
              >
                {line.text}
              </div>
            ))}
            
            {/* Active Input Line */}
            <div className="flex items-center text-white mt-2">
              <span className="mr-2 text-primary font-bold">guest@enigma:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent border-none outline-none text-white caret-[#00ff00]"
                spellCheck="false"
                autoComplete="off"
                autoFocus
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
