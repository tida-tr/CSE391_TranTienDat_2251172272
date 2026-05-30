function Skills({ skills = [] }) {
    return (
        <section id="skills">
            <div className="container">
                <h2>My Skills</h2>
                <div className="skills-grid">
                    {skills.map(skill => (
                        <div key={skill.name} className="skill-item">
                            {skill.name} - {skill.level}%
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Skills;