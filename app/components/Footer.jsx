'use strict'

import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'

export default () => (
  <div className="footer">
    <div className="container">
      <p className="text-muted">
        Created by{' '}
        <a href="http://spmcb.com/" target="_blank" rel="noopener noreferrer">
          Sean
        </a>
        ,{' '}
        <a
          href="https://myspace.com/evandigiambattista"
          target="_blank"
          rel="noopener noreferrer"
        >
          Evan
        </a>
        , and{' '}
        <a href="http://rachelbird.com/" target="_blank" rel="noopener noreferrer">
          Rachel
        </a>
        : the Cookie Monsters of Fullstack Academy{' '}
        <FontAwesomeIcon icon={faGraduationCap} />
      </p>
    </div>
  </div>
)
