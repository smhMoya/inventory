package com.moya.inventory.repository;

import com.moya.inventory.domain.InventoryReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


/**
 * Spring Data JPA repository for the InventoryReport entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InventoryReportRepository extends JpaRepository<InventoryReport, Long> {

    Optional<InventoryReport> findBySteelPipeTypeEqualsAndThicknessEquals(String type, String thickness);
}
