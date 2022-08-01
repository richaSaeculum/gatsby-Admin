import React from 'react'
import Select from 'react-select'

const MultiSelect = ({ options, onChange }: any) => {

  const customStyles = {
    menu: (provided: any, state: any) => ({
      ...provided,
      color: '#2B2B40',
      backgroundColor: '#ffffff',
      border: '1px solid #313B54',
      // borderColor: state.isSelected ? '#313B54' : '#313B54',
      borderRadius: '0.475rem',
      zIndex: '9000'
    }),

    control: (provided: any, state: any) => ({
      ...provided,
      border: '1px solid #313B54',
      boxShadow: 'none',
      minHeight: 'initial',
      padding: '6px 8px'
    }),

    container: (provided: any, state: any) => ({
      ...provided,
      color: '#2B2B40',
      borderRadius: '0.475rem',
      boxShadow: 'none',
      minHeight: 'initial'
    }),

    valueContainer: (provided: any, state: any) => ({
      ...provided,
      padding: '0px'
    }),

    dropdownIndicator: (provided: any, state: any) => ({
      ...provided,
      padding: '0px 8px',
    }),

    clearIndicator: (provided: any, state: any) => ({
      ...provided,
      padding: '0px 8px'
    }),

    indicatorSeparator: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: '#313B54'
    }),

    input: (provided: any, state: any) => ({
      ...provided,
      margin: '0px',
      fontSize: '16px'
    }),
  }

  return (
    <div>
      <Select
        options={options}
        isMulti
        styles={customStyles}
        onChange={(value) => onChange({ target: { name: 'category', value: value } })}
      />
    </div>
  )
}

export default MultiSelect
