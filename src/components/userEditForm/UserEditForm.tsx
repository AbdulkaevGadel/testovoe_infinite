import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import styles from './UserEditForm.module.scss';
import {selectCurrentUser} from "../../selectors/usersSelectors";
import {usersActions} from "../../store/reducers/UsersReducer";
import avatar from "../../img/avatar_user.png"

const UserEditForm = () => {
    const dispatch = useAppDispatch();
    const currentUser = useAppSelector(selectCurrentUser);
    const [formData, setFormData] = useState(currentUser);

    useEffect(() => {
        setFormData(currentUser);
    }, [currentUser]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prev => prev ? {...prev, [name]: value} : null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData) {
            dispatch(usersActions.updateUser(formData));
        }
    };

    if (!formData) {
        return (
            <div className={styles.noUserSelected}>
                <p>Выберите пользователя из списка</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>

            <form className={styles.form} onSubmit={handleSubmit}>


                <div className={styles.inputGroup_title}>

                    <input
                        className={styles.title_input}
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.input_main_wrapper}>
                    <img src={avatar} alt='avatar' className={styles.avatar}/>
                    <div className={styles.input_main_button}>
                        <div className={styles.input_main}>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Компания</label>
                                <input
                                    className={styles.input}
                                    name="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                />
                            </div>


                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Отдел</label>
                                <input
                                    className={styles.input}
                                    name="department"
                                    value={formData.department}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Должность</label>
                                <input
                                    className={styles.input}
                                    name="jobTitle"
                                    value={formData.jobTitle}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <button
                            className={styles.button}
                            type="submit"
                            disabled={!formData}
                        >
                            Сохранить изменения
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default UserEditForm;