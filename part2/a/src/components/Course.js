import React from 'react'

const Header = ({course}) => {
    return (
        <h2>{course}</h2>
    )
};

const Part = ({part, exercises}) => {
    return (
         <p>
            {part} {exercises}
        </p>

    )
};
const Content = ({parts}) => {
    return (
        <>
            {parts.map(part => 
                <Part key={part.id} part={part.name} exercises={part.exercises}/>
            )}
        </>
    )
};


const Total = ({parts}) => {
    return (
        <p><strong>Number of exercises: {parts.reduce((sum, part) => sum + part.exercises, 0)}</strong>
        </p>
    )
};

const Course = ({course}) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course