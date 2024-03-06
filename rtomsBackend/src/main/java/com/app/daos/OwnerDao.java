package com.app.daos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.entities.Owner;

@Repository
public interface OwnerDao extends JpaRepository<Owner, Integer> {

	Owner findByAdharcardNo(String ownerAdharNo);

}
