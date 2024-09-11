import React, { useEffect, useState } from 'react';
import { getDocs, doc, updateDoc } from "firebase/firestore";

import { colRef } from "../../../config/firebase";
import { DndContext, DragOverlay, useDraggable, useDroppable } from '@dnd-kit/core';

const statuses = ['Visitors', 'Contacted', 'OnHoliday', 'FrequentVisitor'];
const KanbanBoard = () => {
  const [users, setUsers] = useState([]);
  const [columns, setColumns] = useState({
    visitors: [],
    contacted: [],
    onHoliday: [],
    frequentVisitor: [],
  });
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const snapshot = await getDocs(colRef);
        const usersArray = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setUsers(usersArray);

        const columnData = {
          visitors: [],
          contacted: [],
          onHoliday: [],
          frequentVisitor: [],
        };

        usersArray.forEach(user => {
          if (user.status === 'Visitors') columnData.visitors.push(user);
          if (user.status === 'Contacted') columnData.contacted.push(user);
          if (user.status === 'OnHoliday') columnData.onHoliday.push(user);
          if (user.status === 'FrequentVisitor') columnData.frequentVisitor.push(user);
        });

        setColumns(columnData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleStatusChange = async (userId, newStatus) => {
    try {
      const userDocRef = doc(colRef, userId);
      await updateDoc(userDocRef, { status: newStatus });

      const updatedUsers = users.map(user => 
        user.id === userId ? { ...user, status: newStatus } : user
      );
      setUsers(updatedUsers);

      const columnData = {
        visitors: [],
        contacted: [],
        onHoliday: [],
        frequentVisitor: [],
      };

      updatedUsers.forEach(user => {
        if (user.status === 'Visitors') columnData.visitors.push(user);
        if (user.status === 'Contacted') columnData.contacted.push(user);
        if (user.status === 'OnHoliday') columnData.onHoliday.push(user);
        if (user.status === 'FrequentVisitor') columnData.frequentVisitor.push(user);
      });

      setColumns(columnData);
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      // The user was dragged and dropped in the same column or dropped outside
      setActiveId(null);
      return;
    }

    const oldColumnKey = active.data.current?.columnId;
    const newColumnKey = over.id;

    if (oldColumnKey && newColumnKey && oldColumnKey !== newColumnKey) {
      const userId = active.id;
      const newStatus = capitalizeFirstLetter(newColumnKey);

      handleStatusChange(userId, newStatus);
    }

    setActiveId(null);
  };

  const DraggableItem = ({ user }) => {
    const { attributes, listeners, setNodeRef } = useDraggable({ 
      id: user.id, 
      data: { columnId: user.status.toLowerCase().replace(' ', '') } 
    });

    return (
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        className="user-card bg-white p-3 rounded mb-2 shadow-sm"
      >
        <h3 className="text-md font-semibold">{user.name}</h3>
        <p>{user.email}</p>
        <p>{user.number}</p>
      </div>
    );
  };

  const DroppableColumn = ({ columnId, children }) => {
    const { setNodeRef } = useDroppable({ id: columnId });

    return (
      <div
        ref={setNodeRef}
        className="kanban-column bg-gray-100 p-4 rounded shadow-md flex flex-col"
      >
        <h2 className="text-lg font-bold mb-2">{capitalizeFirstLetter(columnId)}</h2>
        {children}
      </div>
    );
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="kanban-board flex gap-4 p-4">
        {Object.keys(columns).map(columnKey => (
          <DroppableColumn key={columnKey} columnId={columnKey}>
            {columns[columnKey].map(user => (
              <DraggableItem key={user.id} user={user} />
            ))}
          </DroppableColumn>
        ))}
      </div>
      <DragOverlay>
        {activeId ? (
          <div className="user-card bg-white p-3 rounded shadow-sm">
            {users.find(user => user.id === activeId)?.Name}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default KanbanBoard;