import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import styles from './UserEditForm.module.scss';
import {selectCurrentUser} from "../../selectors/usersSelectors";
import {usersActions} from "../../store/reducers/UsersReducer";

const UserEditForm = () => {
    const dispatch = useAppDispatch();
    const currentUser = useAppSelector(selectCurrentUser);
    const [formData, setFormData] = useState(currentUser);

    useEffect(() => {
        setFormData(currentUser);
    }, [currentUser]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => prev ? { ...prev, [name]: value } : null);
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
            <h2 className={styles.title}>Редактирование профиля</h2>

            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>ID</label>
                    <input
                        className={styles.input}
                        value={formData.id}
                        disabled
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label}>Полное имя</label>
                    <input
                        className={styles.input}
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>

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

                <button
                    className={styles.button}
                    type="submit"
                    disabled={!formData}
                >
                    Сохранить изменения
                </button>
            </form>
        </div>
    );
};

export default UserEditForm;