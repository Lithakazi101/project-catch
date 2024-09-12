import React, { useEffect, useState } from 'react';
import { getDocs, doc, updateDoc } from "firebase/firestore";

import { colRef } from "../../../config/firebase";
import { DndContext, DragOverlay, useDraggable, useDroppable } from '@dnd-kit/core';

const statuses = ['Visitors', 'Contacted', 'OnHoliday', 'FrequentVisitor'];
const KanbanBoard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
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
        setLoading(false)
        console.error('Error fetching users:', error);
      }finally{
        setLoading(false)
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
      {loading ? (
        <div className="loading-indicator flex justify-center items-center min-h-screen">
          <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24"><path d="M13 23c0-.552-.448-1-1-1s-1 .448-1 1 .448 1 1 1 1-.448 1-1zm4.084-.834c0-.483-.393-.875-.875-.875s-.875.392-.875.875.393.875.875.875.875-.392.875-.875zm3.443-2.387c0-.414-.336-.75-.75-.75s-.75.336-.75.75.336.75.75.75.75-.336.75-.75zm2.343-3.568c0-.391-.317-.708-.708-.708s-.708.317-.708.708.317.708.708.708.708-.317.708-.708zm.796-4.209c0-.368-.298-.667-.666-.667s-.666.298-.666.667.298.667.666.667.666-.298.666-.667zm-.879-4.209c0-.345-.28-.625-.625-.625s-.625.28-.625.625.28.625.625.625.625-.279.625-.625zm-2.427-3.568c0-.322-.262-.583-.583-.583s-.583.261-.583.583.262.583.583.583.583-.261.583-.583zm-3.609-2.385c0-.299-.242-.542-.541-.542s-.541.242-.541.542.242.542.541.542.541-.243.541-.542zm-3.751-.84c0-.552-.448-1-1-1s-1 .448-1 1 .448 1 1 1 1-.448 1-1zm-4.21.838c0-.552-.448-1-1-1s-1 .448-1 1 .448 1 1 1 1-.448 1-1zm-3.569 2.385c0-.552-.448-1-1-1s-1 .448-1 1 .448 1 1 1 1-.448 1-1zm-2.384 3.57c0-.552-.448-1-1-1s-1 .448-1 1 .448 1 1 1 1-.447 1-1zm-.837 4.209c0-.552-.448-1-1-1s-1 .448-1 1 .448 1 1 1 1-.448 1-1zm.837 4.209c0-.552-.448-1-1-1s-1 .448-1 1 .448 1 1 1 1-.447 1-1zm2.384 3.569c0-.552-.448-1-1-1s-1 .448-1 1 .448 1 1 1 1-.447 1-1zm3.571 2.383c0-.552-.448-1-1-1s-1 .448-1 1 .448 1 1 1 1-.448 1-1z"/></svg>
        </div>
      ) : (
        Object.keys(columns).map(columnKey => (
          <DroppableColumn key={columnKey} columnId={columnKey}>
            {columns[columnKey].map(user => (
              <DraggableItem key={user.id} user={user} />
            ))}
          </DroppableColumn>
        ))
      )}
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